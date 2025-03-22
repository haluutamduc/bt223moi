import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('5261 4141 0151 8472');
  const [cardHolder, setCardHolder] = useState('Christie Doe');
  const [expiryDate, setExpiryDate] = useState('06 / 2024');
  const [cvv, setCvv] = useState('915');

  // Hàm định dạng số thẻ thành từng nhóm 4 số
  const formatCardNumber = (input) => {
    const cleaned = input.replace(/\D/g, '');
    const formatted = cleaned
      .match(/.{1,4}/g)
      ?.join(' ')
      || cleaned;
    return formatted;
  };

  const handleCardNumberChange = (text) => {
    const formattedText = formatCardNumber(text);
    setCardNumber(formattedText);
  };

  // Hàm định dạng ngày hết hạn thành "MM / YYYY" và kiểm tra giá trị hợp lệ
  const formatExpiryDate = (input) => {
    // Loại bỏ tất cả ký tự không phải số
    const cleaned = input.replace(/\D/g, '');
    // Tách thành tháng (2 số) và năm (4 số)
    const month = cleaned.slice(0, 2);
    const year = cleaned.slice(2, 6);

    // Kiểm tra tháng hợp lệ (01-12)
    let formattedMonth = month;
    if (month.length === 2) {
      const monthNum = parseInt(month, 10);
      if (monthNum < 1) formattedMonth = '01';
      if (monthNum > 12) formattedMonth = '12';
    }

    // Kiểm tra năm hợp lệ (từ năm hiện tại trở đi)
    let formattedYear = year;
    if (year.length === 4) {
      const yearNum = parseInt(year, 10);
      const currentYear = new Date().getFullYear();
      if (yearNum < currentYear) formattedYear = currentYear.toString();
    }

    // Kết hợp tháng và năm với " / " ở giữa
    if (cleaned.length <= 2) {
      return formattedMonth;
    }
    return `${formattedMonth} / ${formattedYear}`;
  };

  const handleExpiryDateChange = (text) => {
    const formattedText = formatExpiryDate(text);
    setExpiryDate(formattedText);
  };

  const handlePayment = () => {
    navigation.navigate('PaymentSuccess');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#007bff" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Icon name="credit-card" size={18} color="#888" style={styles.titleIcon} />
              <Text style={styles.headerTitle}>Checkout</Text>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.total}>₹ 1,527</Text>
              <Text style={styles.gst}>Including GST (18%)</Text>
            </View>
          </View>

          {/* Payment Options */}
          <View style={styles.paymentOptions}>
            <TouchableOpacity style={[styles.optionButton, styles.selectedOption]}>
              <Icon name="credit-card" size={18} color="#28a745" style={styles.optionIcon} />
              <Text style={[styles.optionText, styles.selectedOptionText]}>Credit card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <FontAwesome name="apple" size={18} color="#000" style={styles.optionIcon} />
              <Text style={styles.optionText}>Apple Pay</Text>
            </TouchableOpacity>
          </View>

          {/* Card Number */}
          <Text style={styles.label}>Card number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              keyboardType="numeric"
              maxLength={19}
            />
            <View style={styles.cardIcons}>
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' }}
                style={styles.cardLogo}
              />
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' }}
                style={styles.cardLogo}
              />
              <Icon name="credit-card" size={22} color="#888" style={styles.inputIcon} />
            </View>
          </View>

          {/* Cardholder Name */}
          <Text style={styles.label}>Cardholder name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={cardHolder}
              onChangeText={setCardHolder}
            />
          </View>

          {/* Expiry Date and CVV */}
          <View style={styles.row}>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Expiry date</Text>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="MM / YYYY"
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                keyboardType="numeric"
                maxLength={9}
              />
            </View>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>
                CVV / CVC <Icon name="help-outline" size={16} color="#28a745" />
              </Text>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="123"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Info Text */}
          <Text style={styles.infoText}>
            We will send you an order details to your email after the successful payment
          </Text>

          {/* Pay Button */}
          <View style={styles.payButtonContainer}>
            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
              <Icon name="lock" size={18} color="#fff" style={styles.lockIcon} />
              <Text style={styles.payButtonText}>Pay for the order</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 15, // Giảm paddingTop
    paddingBottom: 15, // Giảm paddingBottom
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20, // Giảm khoảng cách
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  titleIcon: {
    marginRight: 5, // Giảm khoảng cách
  },
  headerTitle: {
    fontSize: 18, // Giảm kích thước font
    fontWeight: 'bold',
    color: '#000',
  },
  totalContainer: {
    alignItems: 'flex-end',
  },
  total: {
    fontSize: 22, // Giảm kích thước font
    fontWeight: 'bold',
    color: '#28a745',
  },
  gst: {
    fontSize: 12, // Giảm kích thước font
    color: '#888',
    marginTop: 2,
  },
  paymentOptions: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10, // Giảm borderRadius
    overflow: 'hidden',
    marginBottom: 15, // Giảm khoảng cách
  },
  optionButton: {
    flex: 1,
    paddingVertical: 15, // Giảm padding
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#e0f7e9',
    borderWidth: 2,
    borderColor: '#28a745',
    borderRadius: 10,
  },
  optionIcon: {
    marginRight: 5, // Giảm khoảng cách
  },
  optionText: {
    fontSize: 16, // Giảm kích thước font
    color: '#000',
  },
  selectedOptionText: {
    color: '#28a745',
  },
  label: {
    fontSize: 14, // Giảm kích thước font
    marginBottom: 5, // Giảm khoảng cách
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10, // Giảm borderRadius
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10, // Giảm khoảng cách
  },
  input: {
    flex: 1,
    padding: 15, // Giảm padding
    fontSize: 16, // Giảm kích thước font
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cardIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLogo: {
    width: 24, // Giảm kích thước logo thẻ
    height: 16,
    marginRight: 5,
  },
  inputIcon: {
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Giảm khoảng cách
  },
  halfInputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  halfInput: {
    padding: 15, // Giảm padding
    fontSize: 16, // Giảm kích thước font
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  infoText: {
    fontSize: 14, // Giảm kích thước font
    color: '#888',
    textAlign: 'center',
    marginVertical: 20, // Giảm khoảng cách
    lineHeight: 20, // Giảm khoảng cách dòng
  },
  payButtonContainer: {
    marginHorizontal: 15, // Giảm khoảng cách hai bên
    marginBottom: 20, // Giảm khoảng cách dưới
  },
  payButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15, // Giảm padding
    borderRadius: 10, // Giảm borderRadius
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lockIcon: {
    marginRight: 5, // Giảm khoảng cách
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16, // Giảm kích thước font
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;