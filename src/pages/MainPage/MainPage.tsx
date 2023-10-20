import { AppCard } from "../../components/AppCard/AppCard";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { AppMain } from "../../components/AppMain/AppMain";
import { AppNavigation } from "../../components/AppNavigation/AppNavigation";
import { useGetForSaleQuery } from "../../store/api/propertiesApi";
import { SCCardsContainer, SCHomeList } from "./MainPage.styled";

interface IData {
  location: any;
  description: any;
  baths: number;
  beds: number;
  sqft: number;
  href: string;
  city: string;
  line: string;
  postal_code: string;
  state_code: string;
  status: string;
  list_price: number;
  date: string;
  permalink: string;
  property_id: string;
  primary_photo: string;
}

export const MainPage = () => {
  const { data, isLoading, error } = useGetForSaleQuery({
    property_id: "",
    limit: 1,
    location: "santa monica",
    type: "single_family",
  });

  if (data) {
    console.log("DATA: ", data);
  }

  const homes: IData[] = data?.home_search.results;

  return (
    <>
      <AppNavigation />
      <AppMain />
      <SCHomeList>
        <AppHeader type="h2" headerText="Browse homes in West Palm Beach, FL" />
        {isLoading && <h5>Идет загрузка</h5>}
        {error && <h5>Ошибка</h5>}
        <SCCardsContainer>
          {homes &&
            homes.map((h: IData) => (
              <AppCard
                key={h.property_id}
                baths={h.description.baths}
                beds={h.description.beds}
                sqft={h.description.lot_sqft}
                href={h.primary_photo}
                city={h.location.address.city}
                line={h.location.address.line}
                postal_code={h.location.address.postal_code}
                state_code={h.location.address.state_code}
                status={h.status}
                list_price={h.list_price}
                date={h.date}
                permalink={h.permalink}
                property_id={h.property_id}
                estimate={0}
                listing_id={""}
              />
            ))}
        </SCCardsContainer>
        <div className="favourites">
          <AppHeader headerText="Favourites" type="h2" />
        </div>
      </SCHomeList>
    </>
  );
};
