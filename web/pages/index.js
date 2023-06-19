import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";


function Home() {
  const router = useRouter();
  const token = useSelector(state => state.auth.token);
  if (token){
    router.push('/dashboard')
  }else{
    router.push('/login')
  }
  return (
    <div>
      <Spinner animation="grow" variant="warning" />
    </div>
  );
}

export default Home;
