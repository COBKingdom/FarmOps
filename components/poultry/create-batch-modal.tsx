'use client'

import { useState } from 'react'
import { createPoultryBatch } from '@/services/poultry.service'

interface CreateBatchModalProps {
  open: boolean
  onClose: () => void
}

export function CreateBatchModal({
  open,
  onClose,
}: CreateBatchModalProps) {
  const [batchName, setBatchName] = useState('')
  const [birdType, setBirdType] = useState('')
  const [quantity, setQuantity] = useState('')

  async function handleCreateBatch() {
    try {
      await createPoultryBatch({
        batch_name: batchName,
        bird_type: birdType,
        current_quantity: Number(quantity),
      })

      onClose()

      window.location.reload()
    } catch (error) {
      console.error(error)
      alert('Failed to create batch')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Create Poultry Batch
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Batch Name"
            value={batchName}
            onChange={(e) =>
              setBatchName(e.target.value)
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Bird Type"
            value={birdType}
            onChange={(e) =>
              setBirdType(e.target.value)
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            className="w-full border rounded-xl p-3"
          />
        </div>

        <button
          onClick={handleCreateBatch}
          className="w-full bg-black text-white rounded-xl p-3"
        >
          Save Batch
        </button>
      </div>
    </div>
  )
}