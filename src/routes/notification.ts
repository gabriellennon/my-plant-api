import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ReminderData {
  plantId: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  reminderTime: string; // Horário no formato "HH:MM"
  lastWatered?: Date; // Data da última rega (opcional)
}

export async function calculateNextReminderDate(
  app: FastifyInstance,
  reminderData: ReminderData
): Promise<Date | null> {
  try {
    // Verifique se a planta existe no banco de dados
    const existingPlant = await prisma.plant_User.findUnique({
      where: { id: reminderData.plantId },
    });

    if (!existingPlant) {
      app.log.error('Planta não encontrada.');
      return null;
    }

    // Calcule a próxima data de lembrete com base na frequência
    const currentDate = new Date();
    let nextReminderDate = new Date();

    switch (reminderData.frequency) {
      case 'daily':
        nextReminderDate.setDate(currentDate.getDate() + 1);
        break;
      case 'weekly':
        if (reminderData.lastWatered) {
          // Calcule a próxima ocorrência do dia da semana após a última data de rega
          const lastWateredDate = new Date(reminderData.lastWatered);
          const daysToAdd = 7 - (lastWateredDate.getDay() - currentDate.getDay());
          nextReminderDate.setDate(currentDate.getDate() + daysToAdd);
        } else {
          // Use a data atual se não houver data de rega anterior
          nextReminderDate.setDate(currentDate.getDate() + 1);
        }
        break;
      case 'monthly':
        // Calcule a próxima ocorrência do dia do mês após a data atual
        const dayOfMonth = parseInt(reminderData.reminderTime.split(':')[1], 10);
        nextReminderDate.setMonth(currentDate.getMonth() + 1);
        nextReminderDate.setDate(dayOfMonth);
        break;
      default:
        app.log.error('Frequência de lembrete inválida.');
        return null;
    }

    // Configure o horário do lembrete com base no horário fornecido
    const [hours, minutes] = reminderData.reminderTime.split(':');
    nextReminderDate.setHours(parseInt(hours, 10));
    nextReminderDate.setMinutes(parseInt(minutes, 10));
    nextReminderDate.setSeconds(0);

    return nextReminderDate;
  } catch (error) {
    app.log.error('Erro ao calcular a próxima data de lembrete:', error);
    return null;
  }
}
