import { ScrollView } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { BACKEND_ENTRIES_FETCH, BACKEND_SYMPTOMS_FETCH, BACKEND_TRIGGERS_FETCH } from '../../constants/urls'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormComponent from '../../components/FormComponent'

const Add = () => {
  const submitForm = async () => {
    const capitalizeWords = (str) =>
      str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    try {
      const res = await fetch(BACKEND_ENTRIES_FETCH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          symptom: capitalizeWords(form.symptom),
          trigger: capitalizeWords(form.trigger),
          time: new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true }),
          severity: form.severity,
          notes: form.notes,
          isQuickAdd: false
        })
      })

      const triggerResponse = await fetch(BACKEND_TRIGGERS_FETCH, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trigger: capitalizeWords(form.trigger) }),
      });

      const symptomResponse = await fetch(BACKEND_SYMPTOMS_FETCH, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symptom: capitalizeWords(form.symptom) }),
      });
      if (res.ok) {
        console.log('Form submitted successfully')
        setForm({
          date: '',
          time: '',
          symptom: '',
          trigger: '',
          time: '',
          severity: '',
          notes: '',
          isQuickAdd: false
        })
        router.push("/dashboard")
      } else {
        console.error('Failed to submit form')
      }
    } catch (error) {
      console.error('Failed to submit form:', error)
    }
  }

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
  return (
    <SafeAreaView className="bg-tiffany-300 h-full">
      <ScrollView>
        <FormComponent type="new" form={form} setForm={setForm} submitForm={submitForm}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Add