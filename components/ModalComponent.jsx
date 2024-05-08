import { View, Text } from 'react-native'
import { Modal, Portal, Button } from 'react-native-paper'
import React from 'react'

const ModalComponent = ({visible, hideModal, entry}) => {
  return (
    <Portal>
        <Modal visible={visible} onDismiss={hideModal}>

        </Modal>
    </Portal>
  )
}

export default ModalComponent