import { Text, View, Button, StyleSheet } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from 'react-native-paper';
import userValidation from 'validations/signup';
export default function App() {
  type UserFormType = z.infer<typeof userValidation>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(userValidation),
  });

  const onSubmit: SubmitHandler<UserFormType> = (data: UserFormType) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              mode="outlined"
              label="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              activeOutlineColor={error ? 'red' : 'black'}
              style={styles.input}
            />
          </View>
        )}
        name="name"
      />
      {errors.name && <Text style={{ color: '#ff8566' }}>{errors.name.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            mode="outlined"
            label="E-mail"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            activeOutlineColor={error ? 'red' : 'black'}
            style={styles.input}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={{ color: '#ff8566' }}>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            mode="outlined"
            label="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            activeOutlineColor={error ? 'red' : 'black'}
            style={styles.input}
          />
        )}
        name="password"
      />
      {errors.password && <Text style={{ color: '#ff8566' }}>{errors.password.message}</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10,
    padding: 8,
  },
  input: {
    marginVertical: 10,
  },
});
