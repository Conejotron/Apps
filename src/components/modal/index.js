import { Modal } from "react-native";
import React from "react";

const CustomModal = ({ 
    children, 
    modalVisible, 
    animationType, 
    onRequestClose = () => null,
    transparent = false
}) => {
    return (
        <Modal
            animationType={animationType}
            visible={modalVisible}
            onRequestClose={onRequestClose}
            transparent={transparent}
        >
            {children}
        </Modal>
    )
}

export default CustomModal;