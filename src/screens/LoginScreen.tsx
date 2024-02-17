import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Snackbar, HelperText} from 'react-native-paper';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('nkp@gmail.com');
  const [password, setPassword] = useState('Nkp@12345');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const isEmailValid = () => /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = () =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(
      password,
    );

  const isSubmitDisabled = () => !isEmailValid() || !isPasswordValid();

  const handleSnackbarDismiss = () => setSnackbarVisible(false);

  const handleSubmit = () => {
    setSnackbarVisible(true);
    // Navigate to the next screen (replace 'NextScreen' with your actual screen name)
    navigation.replace('Movies');
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <HelperText type="error" visible={!isEmailValid()}>
        Enter a valid email address
      </HelperText>

      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <HelperText type="error" visible={!isPasswordValid()}>
        Password must be 8-15 characters with at least one uppercase letter and
        one special character.
      </HelperText>

      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={isSubmitDisabled()}
        style={styles.button}>
        Submit
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleSnackbarDismiss}
        action={{
          label: 'Dismiss',
          onPress: handleSnackbarDismiss,
        }}>
        Login Successful!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default LoginScreen;
