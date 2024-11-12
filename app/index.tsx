import { Link, Stack } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        <Link asChild href={{ pathname: '/details', params: { name: 'Dan' } }}>
          <Button title="Show Details" />
        </Link>
      </Container>
    </>
  );
}
