import {
	View,
	Text,
	TouchableOpacity,
	Alert,
} from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
	CardForm,
	useStripe,
	StripeContainer,
	useConfirmPayment

} from '@stripe/stripe-react-native';
import {
	Button,
	Card,
} from 'react-native-paper';
import { ArrowLeftIcon, StarIcon, XMarkIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native';
import { API_URL, stripeAPI } from '../Config';
import { useDispatch, useSelector } from 'react-redux'
import { clearBasket } from '../features/basketSlice';


export default function PaymentScreen() {
	const navigation = useNavigation();
    const dispatch = useDispatch();
	const [cardDetails, setCardDetails] = useState();
	const { confirmPayment, loading } = useConfirmPayment();

  const {
    params: {
      grandTotal,
	  name,
	  streetAddress1,
	  streetAddress2,
	  city,
	  state,
	  zipCode
    },
  } = useRoute();

  const clearItemBasket = () => {
	dispatch(clearBasket())
}

  const handlePayment = () => {
	if(!cardDetails?.complete) {
		Alert.alert("Please enter a valid card.");
		return;
	} else {
		clearItemBasket();
		navigation.navigate("Home");
		Alert.alert("Thank you for your purchase!");
	}

// 	try {
// 		const finalAmount = parseFloat(grandTotal);
//     	// if (finalAmount > 1) return Alert.alert(finalAmount);

// 		const response = await fetch("http://localhost:5000/donate", 
// 		{
// 			method: 'POST',
// 			headers: {
// 			'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify ({
// 				// paymentMethodType: 'card',
// 				// currency: 'usd'
// 				amount: finalAmount,
// 				name: name

// 			}),
// 		});
// 	  const data = await response.json();
// 		if (!response.ok) {
// 			console.log("failed here.")
// 		return Alert.alert(data.message);
// 		} else {
// 			console.log("this passed.")
// 		}

// 	const initSheet = await stripe.initPaymentSheet({
// 		paymentIntentClientSecret: data.clientSecret,
// 		});
// 		if (initSheet.error) {
// 		console.error(initSheet.error);
// 		return Alert.alert(initSheet.error.message);
// 		}
// 		const presentSheet = await stripe.presentPaymentSheet({
// 		clientSecret: data.clientSecret,
// 		});
// 		if (presentSheet.error) {
// 		console.error(presentSheet.error);
// 		return Alert.alert(presentSheet.error.message);
// 		}

// 		Alert.alert("Donated successfully! Thank you for the donation.");
//   } catch (err) {
//     console.error(err);
//     Alert.alert("Payment failed!");
//   }


  }

	


	return (
		<View>
      
			
			<Card className="rounded-lg mt-36 mx-4 p-4">
				<Text className='font-bold mb-2'>Shipping Address</Text>
				<Text>{name}</Text>
				<Text>{streetAddress1}</Text>
				<Text>{streetAddress2}</Text>
				<Text>{city}, {state} {zipCode}</Text>
			</Card>
			
			<Card className="rounded-lg mt-8 mx-4 p-4">
			<Text className='font-bold mb-2'>Card Information</Text>
			<CardForm
				onFormComplete={(cardDetails) => {
					setCardDetails(cardDetails);
				}}
				style={{ height: 200 }}
			/>
			</Card>
      <Button
				className="my-8 mx-24 p-2 rounded-lg"
				icon="cart"
				color="#000000"
				mode="contained"
        		onPress={handlePayment}
				disabled={loading}
			>
				Pay ${grandTotal}
			</Button>
			<StripeContainer />
			<TouchableOpacity onPress={navigation.goBack} className='absolute top-12 right-5 p-2 bg-gray-300 rounded-full'>
				<XMarkIcon size={35} color={"#FFFFFF"} />
			</TouchableOpacity>
		</View>
	);
}
