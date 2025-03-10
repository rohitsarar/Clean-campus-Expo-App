import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import useVerifyEmail from "../../../hook/useverifyemail";
import { LinearGradient } from "expo-linear-gradient";

const EmailVerificationPage = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const router = useRouter();

	const { verifyEmail } = useVerifyEmail();

	const handleChange = (index, value) => {
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex]?.focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyDown = (index, key) => {
		if (key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handleSubmit = async () => {
		const verificationCode = code.join("");
		try {
			await verifyEmail(verificationCode);
			router.replace("auth/sign-in");
			Alert.alert("Success", "Email verified successfully");
		} catch (error) {
			Alert.alert("Error", "Verification failed. Please try again.");
			console.log(error);
		}
	};

	// Auto-submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit();
		}
	}, [code]);

	return (
		<LinearGradient colors={["#0080ff", "#000000"]} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<View style={{ width: "90%", padding: 25, backgroundColor: "#1E1E1E", borderRadius: 10 }}>
				<Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#4CAF50" }}>
					Verify Your Email
				</Text>
				<Text style={{ textAlign: "center", color: "#ccc", marginBottom: 20 }}>
					Enter the 6-digit code sent to your email address.
				</Text>

				<View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
					{code.map((digit, index) => (
						<TextInput
							key={index}
							ref={(el) => (inputRefs.current[index] = el)}
							style={{
								width: 50,
								height: 50,
								textAlign: "center",
								fontSize: 22,
								color: "white",
								borderWidth: 2,
								borderColor: "#4CAF50",
								marginHorizontal: 5,
								borderRadius: 8,
							}}
							maxLength={1}
							keyboardType="number-pad"
							value={digit}
							onChangeText={(text) => handleChange(index, text)}
							onKeyPress={({ nativeEvent }) => handleKeyDown(index, nativeEvent.key)}
						/>
					))}
				</View>

				<TouchableOpacity
					onPress={handleSubmit}
					disabled={code.some((digit) => !digit)}
					style={{
						backgroundColor: "#4CAF50",
						padding: 15,
						borderRadius: 8,
						alignItems: "center",
						opacity: code.some((digit) => !digit) ? 0.5 : 1,
					}}
				>
					<Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
						Verify Email
					</Text>
				</TouchableOpacity>
			</View>
		</LinearGradient>
	);
};

export default EmailVerificationPage;
