import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
	useStripe,
	Address,
	BillingDetails,
	usePaymentSheet
} from '@stripe/stripe-react-native';
import {
	Button,
	Card,
	TextInput,
} from 'react-native-paper';
import { ArrowLeftIcon} from 'react-native-heroicons/solid';
import PaymentScreen from './PaymentScreen';
import { useDispatch, useSelector } from 'react-redux';
import { selectedBasketItems, totalBasketPrice } from '../features/basketSlice';
import CartItem from '../components/CartItem';

const CheckoutScreen = () => {
	const navigation = useNavigation();
	const [recipientName, setRecipientName] = React.useState('');
	const [streetAddress1, setStreetAddress1] = React.useState('');
	const [streetAddress2, setStreetAddress2] = React.useState('');
	const [city, setCity] = React.useState('');
	const [state, setState] = React.useState('');
	const [zipCode, setZipCode] = React.useState('');
	const [phoneNumber, setPhoneNumber] = React.useState('');
	const stripe = useStripe();
	const [loading, setLoading] = useState(false);
    

	const {
		params: { items, totalCartPrice },
	} = useRoute();

	const shippingOptions = [
		{
			id: 1,
			title: 'Ground',
			duration: '5-7 business days',
			priceText: 'Free',
            price: 0,
		},
		{
			id: 2,
			title: 'Express',
			duration: '3-5 business days',
			priceText: '$7.00',
            price: 7
		},
		{
			id: 3,
			title: 'Next Day',
			duration: 'If order is placed before 5:00 PM today',
			priceText: '$20.00',
            price: 20
		},
	];

    const [selectedShipping, setSelectedShipping] = React.useState(shippingOptions[0]);
    let grandTotal = (totalCartPrice * 1.1025 + selectedShipping.price).toFixed(2);

	// const fetchPaymentSheetParams = async () => {
	// 	const response = await fetch('http://10.0.2.2:4242/payment-sheet', {
	// 	  headers: {
	// 		'Content-Type': 'application/json',
	// 	  },
	// 	});
	// 	const data = await response.json();
    // 	console.log(data);
	
	// 	if (!response.ok) return Alert.alert(data.message);
	// 	const clientSecret = data.clientSecret;
	// 	const initSheet = await stripe.initPaymentSheet({
	// 	paymentIntentClientSecret: clientSecret,
	// 	});
	// 	if (initSheet.error) return Alert.alert(initSheet.error.message);
    // const presentSheet = await stripe.presentPaymentSheet({
    //   clientSecret,
    // });
    // if (presentSheet.error) return Alert.alert(presentSheet.error.message);

    // else{
	// 	navigation.navigate('Payment', {grandTotal: grandTotal});
	//   }
	// }
	console.log(items);
	console.log('test: ' + totalCartPrice);
	return (
		<SafeAreaView>
            <ScrollView>
			<Text className="text-3xl text-center mt-8">Checkout</Text>
			<Card className="rounded-lg mt-8 mx-4 p-8">
				<Text className="text-2xl text-center mb-4">Shipping Address</Text>
				<TextInput
					label="Name"
					value={recipientName}
					mode="outlined"
					onChangeText={(recipientName) => setRecipientName(recipientName)}
					className="mb-4"
				/>
				<TextInput
					label="Street Address 1"
					value={streetAddress1}
					mode="outlined"
					onChangeText={(streetAddress1) => setStreetAddress1(streetAddress1)}
					className="mb-4"
				/>
				<TextInput
					label="Street Address 2 (optional)"
					value={streetAddress2}
					mode="outlined"
					onChangeText={(streetAddress2) => setStreetAddress2(streetAddress2)}
					className="mb-4"
				/>
				<View className="mb-4 flex-row justify-between">
					<TextInput
						label="City"
						value={city}
						mode="outlined"
						onChangeText={(city) => setCity(city)}
						className="w-36"
					/>
					<TextInput
						label="State"
						value={state}
						mode="outlined"
						onChangeText={(state) => setState(state)}
						className="w-16"
					/>
					<TextInput
						label="Zip Code"
						value={zipCode}
						mode="outlined"
						onChangeText={(zipCode) => setZipCode(zipCode)}
						className="w-24"
					/>
				</View>
				<TextInput
					label="Phone Number"
					value={phoneNumber}
					mode="outlined"
					onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
					className="mb-4"
				/>
			</Card>
			<Card className="rounded-lg mt-8 mx-4 p-4 pb-8">
                <Text className="text-2xl text-center mb-2 mt-4">Shipping Options</Text>
				{shippingOptions.map((shipping) => {
					return (
						<TouchableOpacity className="flex-row items-center justify-between mb-2" key={shipping.id} onPress={() => {
                            setSelectedShipping(shipping)
                            console.log(shipping.id)
                            console.log(selectedShipping.id)
                            }}>
							<View className="flex-row items-center">
								<CheckBox
									checkedIcon="dot-circle-o"
									uncheckedIcon="circle-o"
									checked={shipping.id === selectedShipping.id ? true : false} 
                                    onPress={() => setSelectedShipping(shipping)}
								/>

								<View>
									<Text className="font-bold">{shipping.title}</Text>
									<Text className='w-48'>{shipping.duration}</Text>
								</View>
							</View>
							<Text className="font-bold mr-4">{shipping.priceText}</Text>
						</TouchableOpacity>
					);
				})}
			</Card>
			
			<Card className="rounded-lg mt-8 mx-4 p-4">
				<Text className="text-2xl text-center mb-2">Summary</Text>
				<View className="border-b pb-2 border-gray-500">
					{items.map((item) => {
						return (
							<CartItem
								key={item.id}
								id={item.id}
								imgUrl={item.imgUrl}
								title={item.title}
								totalPrice={item.totalPrice}
								sweetnessLevel={item.sweetnessLevel}
								iceLevel={item.iceLevel}
								toppingsList={item.toppingsList}
							/>
						);
					})}
				</View>
				<View className="my-4 mx-4">
					<View className="flex-row justify-between mb-4">
						<Text className="text-lg ">Subtotal:</Text>
						<Text className="text-lg">${totalCartPrice}</Text>
					</View>
					<View className="flex-row justify-between">
						<Text className="text-lg">Shipping:</Text>
						<Text className="text-lg">{selectedShipping.priceText}</Text>
					</View>
                    <View className="flex-row justify-between my-4">
						<Text className="text-lg ">Sales Tax:</Text>
						<Text className="text-lg">${(totalCartPrice * .1025).toFixed(2)}</Text>
					</View>
                    <View className="flex-row justify-between">
						<Text className="font-bold text-lg">Grand Total:</Text>
						<Text className="text-lg">${grandTotal}</Text>
					</View>
				</View>
			</Card>

			<Button
				className="my-8 mx-24 p-2 rounded-lg"
				icon="cart"
				color="#000000"
				mode="contained"
                onPress={
					() => navigation.navigate('Payment', {grandTotal: grandTotal, name:recipientName, streetAddress1: streetAddress1, streetAddress2: streetAddress2, city: city, state: state, zipCode:zipCode})
				}
			>
				Pay Now
			</Button>
            </ScrollView>
            <TouchableOpacity
				onPress={navigation.goBack}
				className="absolute top-20 left-6 p-2 bg-white rounded-full"
			>
				<ArrowLeftIcon size={20} />
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default CheckoutScreen;
