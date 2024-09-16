import { Trash } from 'lucide-react'
import { Button } from './ui/button'
import { deleteGoalCompletion } from '../http/delete-goal-completion'
import { useQueryClient } from '@tanstack/react-query'

interface DeleteCompletionProps {
  goalId: string
}

export function DeleteCompletion({ goalId }: DeleteCompletionProps) {
  const queryClient = useQueryClient()

  async function handleDeleteGoal() {
    await deleteGoalCompletion({ goalId })
    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div>
      <Button onClick={handleDeleteGoal} size="sm">
        <Trash className="size-4" />
      </Button>
    </div>
  )
}
