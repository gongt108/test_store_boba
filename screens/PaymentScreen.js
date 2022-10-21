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


export default function PaymentScreen() {
	const navigation = useNavigation();
	const [cardDetails, setCardDetails] = useState();
	// const { confirmPayment, loading } = useConfirmPayment();

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

//   const fetchPaymentIntentClientSecret = async () => {
// 	const response = await fetch(`https://localhost:3000/create-payment-intent`, {
// 		headers: {
// 		  'Content-Type': 'application/json',
// 		},
// 	  });

// 	  const { clientSecret, error } = await response.json();
// 	  return { clientSecret, error };
//   }

//   const handlePayment = async () => {

// 	if(!cardDetails?.complete) {
// 		Alert.alert("Please enter a valid card.");
// 		return;
// 	}


// 	try {
// 		const { clientSecret, error } = await fetchPaymentIntentClientSecret();

// 		if(error) {
// 			console.log("Unable to process payment.");
// 		} else {
// 			const {paymentIntent, error } = await confirmPayment(clientSecret, {
// 				type: "Card",
// 				name: name,
// 				grandTotal: grandTotal
// 			});
// 			if(error) {
// 				alert(`Payment Confirmation Error ${error.message}`);
// 			} else if(paymentIntent) {
// 				alert("Payment successful ", paymentIntent);
// 			}
// 		}
// 	} catch (e) {
// 		console.log(e);
// 	}
//   }

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
					console.log('card details', cardDetails);
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
        		// onPress={() => handlePayment}
				// disabled={loading}
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
