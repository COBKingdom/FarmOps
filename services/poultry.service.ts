import { supabase } from '@/lib/supabase/client'

export async function getPoultryBatches() {
  const { data, error } = await supabase
    .from('poultry_batches')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase Error:', error)
    return []
  }

  return data
}

interface CreateBatchPayload {
  batch_name: string
  bird_type: string
  current_quantity: number
}

export async function createPoultryBatch(
  payload: CreateBatchPayload
) {
  const { data, error } = await supabase
    .from('poultry_batches')
    .insert([payload])
    .select()
    .single()

  if (error) {
    console.error('Create Batch Error:', error)
    throw error
  }

  return data
}
interface CreateDailyLogPayload {
  batch_id: string
  bird_count: number
  mortality: number
  isolated_birds: number
  feed_used_kg: number
  feed_bought_kg: number
  feed_remaining_kg: number
  birds_sold: number
  medication: string
  notes: string
}

export async function createDailyLog(
  payload: CreateDailyLogPayload
) {
  const { data, error } = await supabase
    .from('daily_poultry_logs')
    .insert([
      {
        ...payload,
        log_date: new Date().toISOString().split('T')[0],
      },
    ])
    .select()
    .single()

  if (error) {
    console.error(
  'Create Daily Log Full Error:',
  JSON.stringify(error, null, 2)
)
    throw error
  }

  return data
}
