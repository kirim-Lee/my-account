import { headers } from 'next/headers';
import Side from './Side';

const Home = async () => {
  fetch(`http://${headers().get('host')}/api/account`, {
    headers: headers(),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));

  return <Side />;
};
export default Home;
