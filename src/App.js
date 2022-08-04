import { AddItem, CustomInput, CustomModal } from './components/index';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react'

export default function App() {
  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const inputvalue = item.trim();


  const onChangeText = (text) => {
    setItem(text)
  }

  const addItem = () => {
      if (inputvalue) {
        setItemList([
          ...itemList,
          {
            id: itemList.length + 1,
            value: item
          } 
        ])
        setItem('');
      }
  }

  const onDeleteItem = (id) => {
    console.warn('onDeleteItem id', id);
    setItemList(currentItems => currentItems.filter(item => item.id !== id));
    setItemSelected({});
    setModalVisible(!modalVisible);
  }

  const onHandlerModal = (id) => {
    console.warn('onHandlerModal id', id);
    setItemSelected(itemList.find(item => item.id === id));
    setModalVisible(!modalVisible);
  }


  const renderItem = ({ item }) => (
    <AddItem item={item} onHandlerModal={onHandlerModal} />
  )

  return (
    <SafeAreaView style={styles.container}>
      <CustomInput 
        item={item}
        onChangeText={onChangeText}
        placeholder='Enter item'
        onPressButton={addItem}
        inputValue={inputvalue}
        buttonText={addItem}
      />
     <View style={styles.itemList}>
      <FlatList 
        data={itemList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style
      />
     </View>
     <CustomModal animationType='slide' modalVisible={modalVisible}>
        <View style={styles.modal}>
          <View style={styles.modalContentContainer}>
            <Text style={styles.modalTitle}>Detalle de la lista</Text>
          </View>
          <View style={styles.modalContentContainer}>
            <Text style={styles.modalMessage}> ¿Estás seguro que deseas eliminar?</Text>
          </View>
          <View style={styles.modalContentContainer}>
            <Text style={styles.modalItem}>{itemSelected.value}</Text>
          </View>
          <View style={styles.modalButton}>
            <Button title='Eliminar' onPress={() => onDeleteItem(itemSelected.id)} color='#DD1C1A' />
            <Button title='Cancelar' onPress={() => setModalVisible(!modalVisible)} color='#F0C808' />
          </View>
        </View>
     </CustomModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#32CBFF',    
  },
  itemList: {
    backgroundColor: '#32CBFF',
    flex: 5,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  modalContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 16,
  },
  modalMessage: {
    fontSize: 14,
  },
  modalItem: {
    fontSize: 15,
    color: '#086788',
    fontWeight: 'bold',
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  modal: {
    flex: 5,
    marginTop: 200
  }
});