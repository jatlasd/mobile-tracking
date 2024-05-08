import { View, Text, ScrollView } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { BACKEND_ENTRIES_FETCH, BACKEND_SYMPTOMS_FETCH, BACKEND_TRIGGERS_FETCH } from '../../constants/urls'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SegmentedButtons } from 'react-native-paper'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

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
        <View className='w-full justify-center min-h-[85vh] px-4 py-6 mt-4'>
          <FormField 
            title="Symptom"
            value={form.symptom}
            placeholder="Enter symptom"
            handleChangeText={(e) => setForm({ ...form, symptom: e })}
          />
          <FormField 
            title="Trigger"
            value={form.trigger}
            placeholder="Enter Trigger"
            handleChangeText={(e) => setForm({ ...form, trigger: e })}
            otherStyles={'my-6'}
          />
          <Text className='text-base text-dark-blue-2 font-pmedium mb-2'>Severity</Text>
          <SegmentedButtons 
            theme={{colors:{secondaryContainer: '#9aefdb', onSecondaryContainer: "#283a53", onSurface: '#283a53', outline: "#283a53", primary: "#283a53"}}}
            value={form.severity}
            onValueChange={(value) => setForm({ ...form, severity: value })}
            buttons={[
              {value: 1, label: '1'},
              {value: 2, label: '2'},
              {value: 3, label: '3'},
              {value: 4, label: '4'},
              {value: 5, label: '5'}
            ]}
          />
          <FormField 
            title="Notes"
            value={form.notes}
            placeholder="Enter Notes"
            handleChangeText={(e) => setForm({ ...form, notes: e })}
            otherStyles={'mt-6 mb-20'}
            isNotes={true}
          />
          <CustomButton 
              title="Submit"
              handlePress={submitForm}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Add