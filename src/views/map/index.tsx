
import { useState, useRef, useEffect } from 'react';
import { MapContainer, Marker, Popup, Rectangle, TileLayer, useMap,useMapEvents} from 'react-leaflet';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { MapIcon, SearchIcon } from 'lucide-react';
import customMarkerImage from '/marker.png'; 
import Search from "react-leaflet-search";


const companies = [
  { id: 1, name: "Company A", position: [51.505, -0.09] },
  { id: 2, name: "Company B", position: [51.515, -0.1] },
  { id: 3, name: "Company C", position: [51.525, -0.11] },
 
];

function MapComponent() {
  const [searchText, setSearchText] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [mapBounds, setMapBounds] = useState([[0, 0], [0, 0]]);
  const [userLocation, setUserLocation] = useState(null); // Store user location


  const MapBoundsHandler = () => {
    const map = useMapEvents({
      moveend: () => {
        const bounds = map.getBounds();
        bounds&&setMapBounds([
          [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
          [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
        ]); // Update the bounds for the rectangle
      },
    });
    return null;
  };

  
  const markersRef = useRef([]);

  const customIcon = new Icon({
    iconUrl: customMarkerImage,
    iconSize: [40, 50],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  
  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const MapUpdater = ({ position }) => {
    const map = useMap();
    if (position) {
      map.setView(position, 14); 
    }
    return null;
  };

  // Open the popup of the selected company marker
  const openPopupForSelectedCompany = () => {
    if (selectedCompany) {
      const marker = markersRef.current[selectedCompany.id - 1];
      if (marker) {
        marker.openPopup();
      }
    }
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]); // Save the user's location
          },
          (error) => {
            console.error("Error fetching location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
  
    // Fetch user location on component mount
    useEffect(() => {
      getUserLocation();
    }, []);
  };

  const [showMobileMap, setShowMobileMap] = useState(false)
  useEffect(() => {
    
  }, [showMobileMap])
  useEffect(() => {
    console.log("Current Map Bounds:", mapBounds);
  }, [mapBounds]);
  return (
    <div className="flex w-full z-[0] mt-[80px] md:h-[calc(100vh-145px)] h-[calc(100vh-105px)] overflow-hidden gap-2 pt-[40px]">
      <div className={`md:w-[25%] w-full min-w-[250px]  h-full md:max-w-[300px] rounded-md p-4 bg-white ${showMobileMap?"!w-0 hidden md:block ":"!block"}`}>
        <div className="bg-brand-400 font-[600] items-center justify-center flex rounded-md h-[50px] w-full">
          Available jobs by companies
        </div>
        <div className="relative flex px-[3px] items-center mt-2 h-[40px] rounded-md border border-brand-300">
          <SearchIcon className=' '/>
          <input
            type="text"
            placeholder='Search by company or location'
            className="w-full placeholder:text-[14px] h-full pl-2 pr-10 rounded-md border-none focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="mt-2">
          {filteredCompanies.map(company => (
            <div 
              key={company.id}
              className="cursor-pointer p-2 hover:bg-gray-200 rounded-md"
              onClick={() => {
                setSelectedCompany(company);
              
                openPopupForSelectedCompany();
              }}
            >
              {company.name}
            </div>
          ))}
        </div>
      </div>
      <button onClick={()=>{setShowMobileMap(!showMobileMap)}} className="size-[40px] fixed shadow-lg bottom-[20px] right-[20px] md:hidden rounded-md flex items-center justify-center bg-brand-400 text-white">
        <MapIcon/>
      </button>

      <MapContainer
        
        center={[51.505, -0.09]}
        zoom={13}
        id='map'
       
        scrollWheelZoom={false}
        className={`flex-1 md:w-full w-[100vw]   h-[calc(100vh-190px)] overflow-hidden`}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        
        <MapUpdater position={selectedCompany ? selectedCompany.position : null} />
        <Rectangle
  bounds={mapBounds}
  pathOptions={{ color: "blue", weight: 2, fillOpacity: 0.1 }}
/>
        <MapBoundsHandler />

        {companies.map((company, index) => (
          <Marker
            key={company.id}
            position={company.position}
            icon={customIcon}
            ref={(el) => markersRef.current[index] = el} 
          >
            <Popup closeButton={false} className='!px-[0px] gap-0 '>
              <div className="">
                <div className="bg-brand-400 rounded-t-lg h-[40px] items-center  flex w-[300px]">
                  <p className='px-[20px] mb-0'>{company.name}</p>
                </div> 
                
                <p className='px-[20px] pb-2'>Kimihurura, Gasabo District, Kigali City, Rwanda
</p>
              </div>
              
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
