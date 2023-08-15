import Image from "next/image";
import { getAllCharacterHeaders, getCharacterIconRoute, getCharacterSplashRoute } from "@/private/data/characters/lib/utils";

const Home: React.FC= () => {  
  const r1 = getCharacterSplashRoute('US11');
  const r2 = getCharacterIconRoute('US11');

  return (
    <main>
      <Image src={`/${r1}`} alt={'US11'} height={400} width={400}/>
      <Image src={`/${r2}`} alt={'US11'} height={200} width={200}/>
    </main>
  )
}
export default Home;