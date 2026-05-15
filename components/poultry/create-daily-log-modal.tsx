'use client'

import { useState } from 'react'
import { createDailyLog } from '@/services/poultry.service'

interface CreateDailyLogModalProps {
  open: boolean
  onClose: () => void
  batchId: string
}

export function CreateDailyLogModal({
  open,
  onClose,
  batchId,
}: CreateDailyLogModalProps) {
  const [birdCount, setBirdCount] = useState('')
  const [mortality, setMortality] = useState('')
  const [isolatedBirds, setIsolatedBirds] =
    useState('')
  const [feedUsed, setFeedUsed] = useState('')
  const [feedBought, setFeedBought] =
    useState('')
  const [feedRemaining, setFeedRemaining] =
    useState('')
  const [birdsSold, setBirdsSold] =
    useState('')
  const [medication, setMedication] =
    useState('')
  const [notes, setNotes] = useState('')

  async function handleCreateLog() {
    try {
      await createDailyLog({
        batch_id: batchId,
        bird_count: Number(birdCount),
        mortality: Number(mortality),
        isolated_birds: Number(isolatedBirds),
        feed_used_kg: Number(feedUsed),
        feed_bought_kg: Number(feedBought),
        feed_remaining_kg: Number(feedRemaining),
        birds_sold: Number(birdsSold),
        medication,
        notes,
      })

      onClose()

      window.location.reload()
    } catch (error) {
      console.error(error)
      alert('Failed to create daily log')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Create Daily Poultry Log
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Bird Count"
            value={birdCount}
            onChange={(e) =>
              setBirdCount(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Mortality"
            value={mortality}
            onChange={(e) =>
              setMortality(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Isolated Birds"
            value={isolatedBirds}
            onChange={(e) =>
              setIsolatedBirds(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Feed Used (kg)"
            value={feedUsed}
            onChange={(e) =>
              setFeedUsed(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Feed Bought (kg)"
            value={feedBought}
            onChange={(e) =>
              setFeedBought(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Feed Remaining (kg)"
            value={feedRemaining}
            onChange={(e) =>
              setFeedRemaining(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Birds Sold"
            value={birdsSold}
            onChange={(e) =>
              setBirdsSold(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Medication"
            value={medication}
            onChange={(e) =>
              setMedication(e.target.value)
            }
            className="border rounded-xl p-3"
          />
        </div>

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          className="w-full border rounded-xl p-3 min-h-[120px]"
        />

        <button
          onClick={handleCreateLog}
          className="w-full bg-black text-white rounded-xl p-3"
        >
          Save Daily Log
        </button>
      </div>
    </div>
  )
}