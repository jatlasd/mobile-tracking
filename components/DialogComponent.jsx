import { View, Text } from "react-native";
import { Dialog, Portal, Button } from "react-native-paper";
import React from "react";

const DialogComponent = ({ visible, hideDialog, handlePress, displayText, buttonText, mt }) => {

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog} style={{height: 150}}>
        <Dialog.Content >
          <Text className={`font-psemi text-lg text-dark-blue-2 text-center ${mt}`}>
            {displayText}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={handlePress}>{buttonText}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogComponent;
