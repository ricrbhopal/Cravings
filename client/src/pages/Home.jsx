import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoSearch,
  IoLocationSharp,
  IoStar,
  IoTimer,
  IoCart,
} from "react-icons/io5";
import {
  MdRestaurant,
  MdLocalDining,
  MdFastfood,
  MdCake,
  MdLunchDining,
} from "react-icons/md";
import MapLocationPicker from "../components/MapLocationPicker";
import CarouselComponent from "../components/CarouselComponent";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "All", icon: MdRestaurant },
    { id: "veg", label: "Vegetarian", icon: MdLocalDining },
    { id: "nonveg", label: "Non-Veg", icon: MdFastfood },
    { id: "dessert", label: "Desserts", icon: MdCake },
    { id: "others", label: "Others", icon: MdLunchDining },
  ];

  // Load mock restaurant data
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        // Mock data - in production, this would come from API
        const mockRestaurants = [
          {
            id: 1,
            name: "Pizza Palace",
            description: "Authentic Italian pizzas and pasta",
            rating: 4.5,
            deliveryTime: "30-45 min",
            deliveryFee: "₹2.99",
            image: "https://placehold.co/300x200?text=Pizza+Palace",
            cuisines: ["Italian", "Pizza"],
            items: [
              {
                itemName: "Margherita Pizza",
                price: 12.99,
                category: "nonveg",
              },
              { itemName: "Vegetarian Pizza", price: 11.99, category: "veg" },
            ],
          },
          {
            id: 2,
            name: "The Veggie Hub",
            description: "Fresh vegetables and healthy options",
            rating: 4.7,
            deliveryTime: "20-35 min",
            deliveryFee: "₹1.99",
            image: "https://placehold.co/300x200?text=Veggie+Hub",
            cuisines: ["Vegetarian", "Health Food"],
            items: [
              { itemName: "Buddha Bowl", price: 9.99, category: "veg" },
              { itemName: "Salad Mix", price: 8.99, category: "veg" },
            ],
          },
          {
            id: 3,
            name: "Sweet Treats Bakery",
            description: "Delicious desserts and baked goods",
            rating: 4.8,
            deliveryTime: "15-25 min",
            deliveryFee: "₹1.49",
            image: "https://placehold.co/300x200?text=Sweet+Treats",
            cuisines: ["Desserts", "Bakery"],
            items: [
              { itemName: "Chocolate Cake", price: 6.99, category: "dessert" },
              { itemName: "Cheesecake", price: 7.99, category: "dessert" },
            ],
          },
          {
            id: 4,
            name: "Spice Route",
            description: "Traditional Indian cuisine with modern twist",
            rating: 4.6,
            deliveryTime: "25-40 min",
            deliveryFee: "₹2.49",
            image: "https://placehold.co/300x200?text=Spice+Route",
            cuisines: ["Indian", "Asian"],
            items: [
              { itemName: "Butter Chicken", price: 13.99, category: "nonveg" },
              { itemName: "Paneer Tikka", price: 10.99, category: "veg" },
            ],
          },
          {
            id: 5,
            name: "Burger Barn",
            description: "Juicy burgers and comfort food",
            rating: 4.4,
            deliveryTime: "20-30 min",
            deliveryFee: "₹1.99",
            image: "https://placehold.co/300x200?text=Burger+Barn",
            cuisines: ["American", "Burgers"],
            items: [
              { itemName: "Classic Burger", price: 11.99, category: "nonveg" },
              { itemName: "Veggie Burger", price: 9.99, category: "veg" },
            ],
          },
          {
            id: 6,
            name: "Noodle Heaven",
            description: "Asian noodles and stir-fry dishes",
            rating: 4.5,
            deliveryTime: "25-35 min",
            deliveryFee: "₹2.49",
            image: "https://placehold.co/300x200?text=Noodle+Heaven",
            cuisines: ["Asian", "Chinese"],
            items: [
              { itemName: "Veg Noodles", price: 8.99, category: "veg" },
              { itemName: "Chicken Noodles", price: 10.99, category: "nonveg" },
            ],
          },
        ];
        setRestaurants(mockRestaurants);
        setFilteredRestaurants(mockRestaurants);
      } catch (error) {
        console.error("Error loading restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants based on search and category
  useEffect(() => {
    let filtered = restaurants;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.cuisines.some((c) =>
            c.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((r) =>
        r.items.some((item) => item.category === selectedCategory),
      );
    }

    setFilteredRestaurants(filtered);
  }, [searchQuery, selectedCategory, restaurants]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationPicker(false);
  };

  const handleOrderNow = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/order-now");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel Background */}
      <section className="relative text-(--color-primary-content) py-16 md:py-40 overflow-hidden">
        {/* Carousel Background */}
        <div className="absolute inset-0 z-0">
          <CarouselComponent />
        </div>

        {/* Dark Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Favorite Food,
              <br />
              Delivered Fast
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Order from thousands of restaurants and get it delivered to your
              doorstep
            </p>
            {!user && (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate("/register/customer")}
                  className="bg-(--color-primary) text-(--color-primary-content) px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Sign Up
                </button>
                <button
                  onClick={handleOrderNow}
                  className="bg-(--color-base-100) text-(--color-base-content) px-8 py-3 rounded-lg font-semibold hover:bg-(--color-base-200) transition"
                >
                  Order Now
                </button>
              </div>
            )}
          </div>

          {/* Search and Location Bar */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="flex items-center bg-(--color-base-100) rounded-lg px-4 py-3">
                  <IoSearch className="text-(--color-base-content) text-xl mr-3" />
                  <input
                    type="text"
                    placeholder="Search restaurants or dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-(--color-base-100) w-full outline-none text-(--color-primary)"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={() => setShowLocationPicker(true)}
                  className="w-full flex items-center justify-center bg-(--color-base-100) rounded-lg px-4 py-3 hover:bg-(--color-base-200) transition text-(--color-primary)"
                >
                  <IoLocationSharp className="text-(--color-primary) text-xl mr-2" />
                  <span className="text-base">
                    {selectedLocation
                      ? `${selectedLocation.lat.toFixed(3)}, ${selectedLocation.lng.toFixed(3)}`
                      : "Set Location"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-(--color-base-100) border-b border-(--color-base-200) py-2 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 md:gap-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition whitespace-nowrap flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-(--color-primary) text-(--color-primary-content)"
                    : "bg-(--color-base-100) text-(--color-base-content) hover:bg-(--color-base-200)"
                }`}
              >
                <category.icon size={20} />
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-linear-to-b from-(--color-primary) to-(--color-primary-content)">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-(--color-content) mb-2">
              {selectedCategory === "all"
                ? "Featured Restaurants"
                : `${categories.find((c) => c.id === selectedCategory)?.label} Options`}
            </h2>
            <p className="text-(--color-base-content)">
              {filteredRestaurants.length} restaurant
              {filteredRestaurants.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {/* Restaurants Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-primary)"></div>
              <p className="mt-4 text-(--color-base-content)">
                Loading restaurants...
              </p>
            </div>
          ) : filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  onClick={() => navigate("/order-now")}
                  className="bg-(--color-base-100) rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer transform hover:scale-105"
                >
                  {/* Restaurant Image */}
                  <div className="relative h-48 overflow-hidden bg-(--color-base-200)">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded-full flex items-center gap-1 font-semibold text-sm">
                      <IoStar size={16} />
                      {restaurant.rating}
                    </div>
                  </div>

                  {/* Restaurant Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-(--color-content) text-lg mb-1">
                      {restaurant.name}
                    </h3>
                    <p className="text-(--color-base-content) text-sm mb-3">
                      {restaurant.description}
                    </p>

                    {/* Cuisines */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {restaurant.cuisines.map((cuisine, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-(--color-base-100) text-(--color-base-content) px-2 py-1 rounded"
                        >
                          {cuisine}
                        </span>
                      ))}
                    </div>

                    {/* Footer Info */}
                    <div className="flex justify-between items-center pt-3 border-t border-(--color-base-200)">
                      <div className="text-sm text-(--color-base-content) flex items-center gap-2">
                        <IoTimer size={18} />
                        <span className="font-semibold">
                          {restaurant.deliveryTime}
                        </span>
                      </div>
                      <div className="text-sm text-(--color-base-content) flex items-center gap-2">
                        <IoCart size={18} />
                        <span>{restaurant.deliveryFee}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-(--color-base-content) text-lg">
                No restaurants found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 bg-(--color-primary) text-(--color-primary-content) px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-(--color-base-100) py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-(--color-content) mb-4">
              Cravings by the Numbers
            </h2>
            <p className="text-lg text-(--color-base-content)">
              See why millions trust us for their daily food delivery needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Successful Deliveries */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition text-center">
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold text-(--color-primary) mb-2">
                  2.5M+
                </div>
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Successful Deliveries
              </h3>
              <p className="text-(--color-base-content)">
                Orders delivered with care and precision
              </p>
            </div>

            {/* Happy Customers */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition text-center">
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold text-(--color-accent) mb-2">
                  500K+
                </div>
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Happy Customers
              </h3>
              <p className="text-(--color-base-content)">
                Satisfied users enjoying delicious food
              </p>
            </div>

            {/* Partner Restaurants */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition text-center">
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold text-(--color-primary) mb-2">
                  5K+
                </div>
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Partner Restaurants
              </h3>
              <p className="text-(--color-base-content)">
                Restaurants serving amazing cuisine
              </p>
            </div>

            {/* Available Partners */}
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition text-center">
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold text-(--color-accent) mb-2">
                  1K+
                </div>
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Active Delivery Partners
              </h3>
              <p className="text-(--color-base-content)">
                Riders ensuring quick and safe delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Feedback & Reviews Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-(--color-content) mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-(--color-base-content)">
              Real feedback from real food lovers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Review Card 1 */}
            <div className="bg-(--color-base-100) rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} size={20} className="text-yellow-400" />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Amazing Service!
              </h3>
              <p className="text-(--color-base-content) mb-4">
                "The food arrived hot and fresh. The delivery was incredibly fast. Highly impressed with Cravings' service!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-(--color-primary) flex items-center justify-center text-white font-bold">
                  AJ
                </div>
                <div>
                  <p className="font-semibold text-(--color-content)">Arun J.</p>
                  <p className="text-sm text-(--color-base-content)">Verified Buyer</p>
                </div>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="bg-(--color-base-100) rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} size={20} className="text-yellow-400" />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Best App Ever!
              </h3>
              <p className="text-(--color-base-content) mb-4">
                "Easy to use interface, wide variety of restaurants, and quick delivery. I order from Cravings every week!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-(--color-accent) flex items-center justify-center text-white font-bold">
                  SP
                </div>
                <div>
                  <p className="font-semibold text-(--color-content)">Sneha P.</p>
                  <p className="text-sm text-(--color-base-content)">Verified Buyer</p>
                </div>
              </div>
            </div>

            {/* Review Card 3 */}
            <div className="bg-(--color-base-100) rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} size={20} className="text-yellow-400" />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-(--color-content) mb-2">
                Excellent Choices
              </h3>
              <p className="text-(--color-base-content) mb-4">
                "Love the variety of restaurants available. Found my new favorite spot through Cravings. Definitely worth it!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-(--color-primary) flex items-center justify-center text-white font-bold">
                  RK
                </div>
                <div>
                  <p className="font-semibold text-(--color-content)">Raj Kumar</p>
                  <p className="text-sm text-(--color-base-content)">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-(--color-primary) text-(--color-primary-content) py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Become a Restaurant Partner
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Grow your business with Cravings. Join thousands of restaurants
            already delivering with us.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-(--color-base-100) text-(--color-primary) px-8 py-3 rounded-lg font-semibold hover:bg-(--color-base-200) transition"
          >
            Partner With Us
          </button>
        </div>
      </section>

      {/* Location Picker Modal */}
      {showLocationPicker && (
        <MapLocationPicker
          onClose={() => setShowLocationPicker(false)}
          onSelectLocation={handleLocationSelect}
        />
      )}
    </div>
  );
};

export default Home;
