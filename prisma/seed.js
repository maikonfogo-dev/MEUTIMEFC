
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./dev.db',
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Seed Team
  const teamPath = path.join(__dirname, '../data/team.json');
  if (fs.existsSync(teamPath)) {
    const teamData = JSON.parse(fs.readFileSync(teamPath, 'utf-8'));

    await prisma.team.upsert({
      where: { id: teamData.slug },
      update: {},
      create: {
        id: teamData.slug,
        name: teamData.name,
        planId: teamData.planId,
        city: teamData.city,
        whatsapp: teamData.whatsapp,
        logoUrl: teamData.logoUrl,
        primaryColor: teamData.colors?.primary,
        secondaryColor: teamData.colors?.secondary,
        accentColor: teamData.colors?.accent,
      },
    });
    console.log(`✅ Team ${teamData.name} created`);

    if (teamData.players) {
      for (const player of teamData.players) {
        await prisma.player.create({
          data: {
            teamId: teamData.slug,
            name: player.name,
            nickname: player.nickname,
            position: player.position,
            number: player.number,
            photoUrl: player.photoUrl,
            stats: JSON.stringify(player.stats),
          },
        });
      }
      console.log(`✅ ${teamData.players.length} players added`);
    }

    if (teamData.sponsors) {
      for (const sponsor of teamData.sponsors) {
        await prisma.sponsor.create({
          data: {
            teamId: teamData.slug,
            name: sponsor.name,
            description: sponsor.description,
            logoUrl: sponsor.logoUrl,
            isMaster: sponsor.isMaster || false,
            category: sponsor.category,
            websiteUrl: sponsor.websiteUrl,
            instagramUrl: sponsor.instagramUrl,
            whatsapp: sponsor.whatsapp,
            status: sponsor.status,
            order: sponsor.order,
          },
        });
      }
    }

    if (teamData.news) {
      for (const news of teamData.news) {
        await prisma.news.create({
          data: {
            teamId: teamData.slug,
            title: news.title,
            summary: news.summary,
            content: news.content,
            date: new Date(news.date),
            imageUrl: news.imageUrl,
          },
        });
      }
    }

    if (teamData.products) {
      for (const product of teamData.products) {
        await prisma.product.create({
          data: {
            teamId: teamData.slug,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            isNew: product.isNew,
            isOfficial: product.isOfficial,
            images: JSON.stringify(product.images),
            variants: JSON.stringify(product.variants),
            installments: JSON.stringify(product.installments),
          },
        });
      }
    }

    if (teamData.nextMatch) {
      await prisma.match.create({
        data: {
          teamId: teamData.slug,
          date: new Date(teamData.nextMatch.date),
          location: teamData.nextMatch.location,
          opponent: teamData.nextMatch.opponent,
          opponentLogoUrl: teamData.nextMatch.opponentLogoUrl,
          isHome: teamData.nextMatch.isHome,
          championship: teamData.nextMatch.championship,
          status: 'scheduled',
        },
      });
    }

    if (teamData.lastMatches) {
      for (const match of teamData.lastMatches) {
        await prisma.match.create({
          data: {
            teamId: teamData.slug,
            date: new Date(match.date),
            location: match.location,
            opponent: match.opponent,
            opponentLogoUrl: match.opponentLogoUrl,
            isHome: match.isHome,
            championship: match.championship,
            score: JSON.stringify(match.score),
            status: 'finished',
          },
        });
      }
    }

    if (teamData.members) {
      for (const member of teamData.members) {
        await prisma.member.create({
          data: {
            teamId: teamData.slug,
            name: member.name,
            email: member.email,
            phone: member.phone,
            cpf: member.cpf,
            planId: member.planId,
            status: member.status,
            since: new Date(member.since),
            paymentMethod: member.paymentMethod,
          },
        });
      }
    }
  }

  // 2. Seed Users
  const usersPath = path.join(__dirname, '../data/users.json');
  if (fs.existsSync(usersPath)) {
    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    for (const user of usersData) {
      const teamId = user.team_id;

      const teamExists = await prisma.team.findUnique({ where: { id: teamId } });
      if (!teamExists) {
        console.log(`Creating placeholder team: ${teamId}`);
        await prisma.team.create({
          data: {
            id: teamId,
            name: teamId === 'global' ? 'Global Admin' : 'Unknown Team',
          },
        });
      }

      await prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          password_hash: user.password_hash,
          role: user.role,
          is_socio: user.is_socio,
          team_id: teamId,
          created_at: new Date(user.created_at),
        },
      });
    }
    console.log(`✅ ${usersData.length} users added`);
  }

  const systemSettingsCount = await prisma.systemSettings.count();
  if (systemSettingsCount === 0) {
    const settingsPath = path.join(__dirname, '../data/settings.json');

    if (fs.existsSync(settingsPath)) {
      const settingsData = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

      if (Array.isArray(settingsData)) {
        for (const s of settingsData) {
          const id = s.id || 'global';

          await prisma.systemSettings.upsert({
            where: { id },
            update: { data: s },
            create: { id, data: s },
          });
        }

        console.log(`✅ SystemSettings migrado de settings.json (${settingsData.length} registros)`);
      }
    }
  }

  const logsCount = await prisma.settingsLog.count();
  if (logsCount === 0) {
    const logsPath = path.join(__dirname, '../data/logs.json');

    if (fs.existsSync(logsPath)) {
      const logsData = JSON.parse(fs.readFileSync(logsPath, 'utf-8'));

      if (Array.isArray(logsData) && logsData.length > 0) {
        await prisma.settingsLog.createMany({
          data: logsData.map((log) => ({
            id: log.id,
            tenantId: log.tenantId,
            userId: log.userId,
            userEmail: log.userEmail,
            module: log.module,
            action: log.action,
            oldValue: log.oldValue || null,
            newValue: log.newValue || null,
            createdAt: new Date(log.createdAt),
          })),
        });

        console.log(`✅ SettingsLog migrado de logs.json (${logsData.length} registros)`);
      }
    }
  }

  const sessionsCount = await prisma.userSession.count();
  if (sessionsCount === 0) {
    const sessionsPath = path.join(__dirname, '../data/sessions.json');

    if (fs.existsSync(sessionsPath)) {
      const sessionsData = JSON.parse(fs.readFileSync(sessionsPath, 'utf-8'));

      if (Array.isArray(sessionsData) && sessionsData.length > 0) {
        await prisma.userSession.createMany({
          data: sessionsData.map((s) => ({
            id: s.id,
            userId: s.userId,
            token: s.token,
            ipAddress: s.ipAddress,
            userAgent: s.userAgent,
            createdAt: new Date(s.createdAt),
            expiresAt: new Date(s.expiresAt),
            isActive: Boolean(s.isActive),
          })),
        });

        console.log(`✅ UserSession migrado de sessions.json (${sessionsData.length} registros)`);
      }
    }
  }

  const consentsCount = await prisma.privacyConsent.count();
  if (consentsCount === 0) {
    const consentsPath = path.join(__dirname, '../data/consents.json');

    if (fs.existsSync(consentsPath)) {
      const consentsData = JSON.parse(fs.readFileSync(consentsPath, 'utf-8'));

      if (Array.isArray(consentsData) && consentsData.length > 0) {
        await prisma.privacyConsent.createMany({
          data: consentsData.map((c) => ({
            id: c.id,
            userId: c.userId,
            consentType: c.consentType,
            accepted: Boolean(c.accepted),
            acceptedAt: new Date(c.acceptedAt),
            ipAddress: c.ipAddress,
          })),
        });

        console.log(`✅ PrivacyConsent migrado de consents.json (${consentsData.length} registros)`);
      }
    }
  }

  const otpCount = await prisma.otp.count();
  if (otpCount === 0) {
    const otpPath = path.join(__dirname, '../data/otp.json');

    if (fs.existsSync(otpPath)) {
      const otpData = JSON.parse(fs.readFileSync(otpPath, 'utf-8'));

      if (Array.isArray(otpData) && otpData.length > 0) {
        await prisma.otp.createMany({
          data: otpData.map((o) => ({
            id: o.id,
            phone: o.phone,
            code: o.code,
            expires_at: new Date(o.expires_at),
            verified: Boolean(o.verified),
          })),
        });

        console.log(`✅ Otp migrado de otp.json (${otpData.length} registros)`);
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
