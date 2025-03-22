import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Import hình ảnh từ thư mục assets
import pmscImage from '../assets/pmsc.png'; // Đường dẫn đúng đến pmsc.png

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();

  // Tùy chỉnh header của React Navigation
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false, // Ẩn chữ "Checkout" trong thanh điều hướng
      headerLeft: () => null, // Ẩn nút quay lại mặc định của React Navigation
    });
  }, [navigation]);

  const handleCheckDetails = () => {
    console.log('Check Details pressed');
  };

  const handleDownloadInvoice = () => {
    console.log('Download Invoice pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#007bff" />
          </TouchableOpacity>
        </View>

        {/* Hình ảnh minh họa */}
        <View style={styles.imageContainer}>
          <Image
            source={pmscImage} // Sử dụng hình ảnh pmsc.png từ assets
            style={styles.image}
          />
        </View>

        {/* Tiêu đề và mô tả */}
        <Text style={styles.title}>Payment Success, YAYY!</Text>
        <Text style={styles.subtitle}>
          We will send order details and invoice in your contact no. and registered email
        </Text>

        {/* Nút Check Details */}
        <TouchableOpacity onPress={handleCheckDetails} style={styles.checkButton}>
          <Text style={styles.checkButtonText}>Check Details</Text>
          <Icon name="arrow-forward" size={24} color="#007bff" style={styles.arrowIcon} />
        </TouchableOpacity>

        {/* Nút Download Invoice */}
        <TouchableOpacity onPress={handleDownloadInvoice} style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Download Invoice</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  image: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#ff69b4',
    borderRadius: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 15,
    lineHeight: 24,
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 30,
  },
  checkButtonText: {
    fontSize: 20,
    color: '#007bff',
    marginRight: 8,
  },
  arrowIcon: {
    marginLeft: 8,
  },
  downloadButton: {
    backgroundColor: '#007bff',
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  downloadButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PaymentSuccessScreen;