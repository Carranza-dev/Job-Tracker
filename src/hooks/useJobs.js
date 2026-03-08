import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { createJobDTO, validateJobDTO } from '../dto/jobDto'

export function useJobs() {
  const [jobs, setJobs]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    setLoading(true)
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) setError(error.message)
    else setJobs(data)
    setLoading(false)
  }

 async function addJob(formData) {
  const dto = createJobDTO(formData)
  const { isValid, errors } = validateJobDTO(dto)
  if (!isValid) return { success: false, errors }

  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('jobs')
    .insert([{ ...dto, user_id: user.id }])
    .select()

  if (error) return { success: false, errors: { general: error.message } }
  setJobs([data[0], ...jobs])
  return { success: true }
}

  async function updateJob(id, formData) {
    const dto = createJobDTO(formData)
    const { isValid, errors } = validateJobDTO(dto)
    if (!isValid) return { success: false, errors }

    const { data, error } = await supabase
      .from('jobs')
      .update(dto)
      .eq('id', id)
      .select()

    if (error) return { success: false, errors: { general: error.message } }
    setJobs(jobs.map(j => j.id === id ? data[0] : j))
    return { success: true }
  }

  async function deleteJob(id) {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id)

    if (error) return { success: false }
    setJobs(jobs.filter(j => j.id !== id))
    return { success: true }
  }

  return { jobs, loading, error, addJob, updateJob, deleteJob, fetchJobs }
}