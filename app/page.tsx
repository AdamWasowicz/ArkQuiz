import Image from "next/image";
import { getCharacterIconRoute, getCharacterSplashRoute, getTodayCharacterId, getAllCharactersHeaderMap } from "@/resources/data/character/lib/utils";
import SearchBar from "@/resources/data/character/components/searchbar";

const Home: React.FC= () => {
  const todayId = getTodayCharacterId();
  const r1 = getCharacterSplashRoute(todayId);
  const r2 = getCharacterIconRoute(todayId);
  const headers = getAllCharactersHeaderMap();


  return (
    <main>
      <Image src={`/${r1}`} alt={todayId} height={200} width={200}/>
      <Image src={`/${r2}`} alt={todayId} height={100} width={100}/>
    
      <SearchBar a={headers}/>
    </main>
  )
}
export default Home;