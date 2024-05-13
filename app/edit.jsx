import { ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormComponent from '../components/FormComponent'
import { useRoute } from '@react-navigation/native'
import { router } from 'expo-router'
import { BACKEND_ENTRIES_FETCH } from '../constants/urls'

const Edit = () => {
    const route = useRoute()
    const id = route.params.id
    const [form, setForm] = useState({
        date: '',
        time: '',
        symptom: '',
        trigger: '',
        time: '',
        severity: '',
        notes: '',
        isQuickAdd: false
      })

      useEffect(() => {
        const fetchEntry = async () => {
            try {
                const res = await fetch(`${BACKEND_ENTRIES_FETCH}`)
                const data = await res.json()
                const entryToEdit = data.filter((item) => item._id === id)
                setForm(entryToEdit[0])
            } catch (error) {
                console.error('Failed to fetch entry:', error)
            }
            
        }
        fetchEntry()
        console.log(form)
      }, [])

      const editEntry = async () => {
        const capitalizeWords = (str) =>
            str
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
        try {
            const res = await fetch(`${BACKEND_ENTRIES_FETCH}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    symptom: capitalizeWords(form.symptom),
                    trigger: capitalizeWords(form.trigger),
                    severity: form.severity,
                    notes: form.notes
                })
            })
            if (res.ok) {
                router.push('/dashboard')
            } else {
                console.error('Failed to edit entry')
            }
        } catch (error) {
            console.error('Failed to edit entry:', error)
        
      }}

  return (
    <SafeAreaView className='h-full bg-tiffany-300'>
        <ScrollView>
            <FormComponent type='edit' entry={form} setForm={setForm} submitForm={editEntry}/>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Edit