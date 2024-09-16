import { eq } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions } from '../db/schema'

interface DeleteGoalCompletionRequest {
  goalId: string
}

export async function deleteGoalCompletion({
  goalId,
}: DeleteGoalCompletionRequest) {
  const completion = await db
    .select()
    .from(goalCompletions)
    .where(eq(goalCompletions.id, goalId))
    .limit(1)

  if (!completion.length) {
    throw new Error('Nenhuma conclusão de meta encontrada para excluir!')
  }

  await db.delete(goalCompletions).where(eq(goalCompletions.id, goalId))

  return {
    message: 'Meta excluída com sucesso!',
  }
}
