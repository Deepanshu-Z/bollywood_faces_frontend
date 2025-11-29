import { Text, View, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from 'react-native-paper';
import userValidation from 'validations/signup';
import { useMutation } from '@tanstack/react-query';
import api from 'axios/api';

export default function App() {
  type UserFormType = z.infer<typeof userValidation>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(userValidation),
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await api.post('/api/auth/sign-in/email​', formData);
      return res.data;
    },
    onSuccess: (res) => console.log('API Response:', res),
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInput
            mode="outlined"
            label="Username"
            onChangeText={onChange}
            value={value}
            activeOutlineColor={error ? 'red' : 'black'}
            style={styles.input}
          />
        )}
      />
      {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInput
            mode="outlined"
            label="Email"
            onChangeText={onChange}
            value={value}
            activeOutlineColor={error ? 'red' : 'black'}
            style={styles.input}
          />
        )}
      />
      {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry
            onChangeText={onChange}
            value={value}
            activeOutlineColor={error ? 'red' : 'black'}
            style={styles.input}
          />
        )}
      />
      {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

      <Button
        title={mutation.isPending ? 'Sending...' : 'Submit'}
        onPress={handleSubmit(onSubmit)}
        disabled={mutation.isPending}
      />

      {mutation.isSuccess && <Text style={{ marginTop: 10 }}>Response Loaded Successfully</Text>}
      {mutation.isError && <Text style={{ marginTop: 10, color: 'red' }}>Request Failed</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 12,
  },
  input: {
    marginVertical: 10,
  },
});
