import { Container } from 'components/Container';
import { Search } from 'components/Search';
import { TheHeader } from 'components/TheHeader';
import { UserCard } from 'components/UserCard';
import { defaultUser } from 'mock';
import { useState } from 'react';
import { GithabError, GithabUser, LocalGithabUser } from 'types';
import { extractLocalUser } from 'utils/exract-local-user';
import { isGithabUser } from 'utils/typeguards';

const BASE_URL = 'https://api.github.com/users/';

function App() {
  const [user, setUser] = useState<LocalGithabUser | null>(defaultUser);

  const fetchUser = async (username: string) => {
    const url = BASE_URL + username;

    const res = await fetch(url);
    const user = (await res.json()) as GithabUser | GithabError;

    if (isGithabUser(user)) {
      setUser(extractLocalUser(user));
    } else {
      setUser(null);
    }
  };
  return (
    <Container>
      <TheHeader />
      <Search hasError={!user} onSubmit={fetchUser} />
      {user && <UserCard {...user} />}
    </Container>
  );
}

export default App;
