import axios from 'axios';
import React,{useEffect,useState} from 'react'

export default function Profile() {
const id=1;
const [newUser, setUser] = useState({
  name: "",
  email: "", // Set a default category
  phone: "",
  username: "",
  password: "",
  address: {},
});
const [newAddress, setAddress] = useState({
  street: "",
  city: "",
  state: "",
  pincode: 230687,
});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8080/getprofile/"+id;
        const response = await axios.get(url);
        setUser(response.data);
        setAddress(response.data.address);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleInputAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log(newAddress);
    setUser((prevUser) => ({
      ...prevUser,
      address: newAddress,
    }));
  }, [newAddress]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/updateProfile", newUser)
      .then((response) => {
        console.log("User sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };
  return (
    <>
    <div className='pb-5'></div>
      <h2 className="text-primary text-center pt-2 my-0">Profile</h2>
      <div className="row">
        <div className="col-2"></div>
      <div className="colour  rounded-5 my-3 py-3 px-3 col-8">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productname">Name</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productname">Email</label>
            <input
              type="email"
              className="form-control"
              id="username"
              name="email"
              placeholder="example@gmail.com"
              value={newUser.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={newUser.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
            />
          </div>
          <h3 className="text-primary text-center my-2">Address Details</h3>
          <div className="form-group">
            <label htmlFor="street">street</label>
            <input
              type="text"
              className="form-control"
              id="street"
              name="street"
              value={newAddress.street}
              onChange={handleInputAddressChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">city</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={newAddress.city}
              onChange={handleInputAddressChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">state</label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={newAddress.state}
              onChange={handleInputAddressChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">pincode</label>
            <input
              type="number"
              className="form-control"
              id="pincode"
              name="pincode"
              value={newAddress.pincode}
              onChange={handleInputAddressChange}
            />
          </div>
          <div className="d-flex justify-content-center py-3">
            <button type="submit" className="btn btn-outline-primary">
             Update Profile
            </button>
          </div>
        </form>
      </div>
      <div className="col-2"></div>

      </div>
    </>
  );
}
