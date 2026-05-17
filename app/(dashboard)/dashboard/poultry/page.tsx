'use client'

import { useEffect, useState } from 'react'

import { CreateBatchModal } from '@/components/poultry/create-batch-modal'
import { CreateDailyLogModal } from '@/components/poultry/create-daily-log-modal'

import {
  getPoultryBatches,
  getDailyLogs,
} from '@/services/poultry.service'

export default function PoultryPage() {
  const [openModal, setOpenModal] =
    useState(false)

  const [batches, setBatches] = useState<any[]>([])

  const [openLogModal, setOpenLogModal] =
    useState(false)

  const [selectedBatchId, setSelectedBatchId] =
    useState('')

  const [logs, setLogs] = useState<{
    [key: string]: any[]
  }>({})

  useEffect(() => {
    async function loadBatches() {
      const data = await getPoultryBatches()

      setBatches(data || [])

      if (data) {
        const logsMap: {
          [key: string]: any[]
        } = {}

        for (const batch of data) {
          const batchLogs =
            await getDailyLogs(batch.id)

          logsMap[batch.id] = batchLogs || []
        }

        setLogs(logsMap)
      }
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

              <div className="pt-4 border-t space-y-2">
                <h3 className="font-semibold text-sm">
                  Recent Daily Logs
                </h3>

                {logs[batch.id]?.length === 0 ? (
                  <p className="text-xs text-gray-500">
                    No logs yet
                  </p>
                ) : (
                  logs[batch.id]
                    ?.slice(0, 3)
                    .map((log) => (
                      <div
                        key={log.id}
                        className="bg-gray-50 rounded-xl p-3 text-xs space-y-1"
                      >
                        <p>
                          Date:{' '}
                          {new Date(
                            log.created_at
                          ).toLocaleDateString()}
                        </p>

                        <p>
                          Mortality:{' '}
                          <span className="font-medium">
                            {log.mortality}
                          </span>
                        </p>

                        <p>
                          Feed Used:{' '}
                          <span className="font-medium">
                            {log.feed_used_kg}kg
                          </span>
                        </p>

                        <p>
                          Medication:{' '}
                          <span className="font-medium">
                            {log.medication || '-'}
                          </span>
                        </p>

                        <p>
                          Birds Sold:{' '}
                          <span className="font-medium">
                            {log.birds_sold}
                          </span>
                        </p>
                      </div>
                    ))
                )}
              </div>
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