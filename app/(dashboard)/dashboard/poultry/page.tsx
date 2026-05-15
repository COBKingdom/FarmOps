'use client'

import { useEffect, useState } from 'react'
import { CreateBatchModal } from '@/components/poultry/create-batch-modal'
import { CreateDailyLogModal } from '@/components/poultry/create-daily-log-modal'
import { getPoultryBatches } from '@/services/poultry.service'

export default function PoultryPage() {
  const [openModal, setOpenModal] =
    useState(false)

  const [batches, setBatches] = useState<any[]>([])

  const [openLogModal, setOpenLogModal] =
    useState(false)

  const [selectedBatchId, setSelectedBatchId] =
    useState('')

  useEffect(() => {
    async function loadBatches() {
      const data = await getPoultryBatches()

      setBatches(data || [])
    }

    loadBatches()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Poultry Batches
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          + New Batch
        </button>
      </div>

      {batches.length === 0 ? (
        <div className="border rounded-2xl p-10 text-center text-gray-500">
          No poultry batches yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className="border rounded-2xl p-6 bg-white shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {batch.batch_name}
                </h2>

                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  Bird Type:{' '}
                  <span className="font-medium text-black">
                    {batch.bird_type}
                  </span>
                </p>

                <p>
                  Current Quantity:{' '}
                  <span className="font-medium text-black">
                    {batch.current_quantity}
                  </span>
                </p>

                <p>
                  Created:{' '}
                  <span className="font-medium text-black">
                    {new Date(
                      batch.created_at
                    ).toLocaleDateString()}
                  </span>
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedBatchId(batch.id)
                  setOpenLogModal(true)
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl p-3 transition"
              >
                + Daily Log
              </button>
            </div>
          ))}
        </div>
      )}

      <CreateBatchModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <CreateDailyLogModal
        open={openLogModal}
        onClose={() => setOpenLogModal(false)}
        batchId={selectedBatchId}
      />
    </div>
  )
}