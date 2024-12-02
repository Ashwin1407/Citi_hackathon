import React, { useState } from "react";
import { baseUrl } from "../url";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CustomerDetailsDisplay from './CustomerDetailsDisplay';
import TableNewCreditCard from './TableNewCreditCard';

function AddCreditCard() {
  const [postData, setPostData] = useState({
    // customerId: 0,
  });
  const [customerDetails, setCustomerDetails] = useState({});
  const [customerFound, setCustomerFound] = useState(0);
  const [loader, setLoader] = useState(false);
  const [renderResponse, setRenderResponse] = useState(false);
  const [renderData, setRenderData] = useState({});
  const [renderError, setRenderError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    const url = `${baseUrl}/customer?customerId=${postData.customerId}&customerId=${postData.description}`;
    setRenderResponse(false);
    setRenderError(false);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setCustomerDetails((prevData) => ({
        ...prevData,
        ...data,
      }));
      setCustomerFound(1);
    } catch (error) {
      console.log(error);
      setCustomerFound(2);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setRenderResponse(false);
    setLoader(true);
    const url = `${baseUrl}/CreditCard/add`;

    try {
      console.log(postData);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      console.log(data);
      setRenderError(false);
      setLoader(false);
      setRenderResponse(true);
      setRenderData((prevData) => ({
        ...prevData,
        ...data,
      }));
    } catch (error) {
      console.error("Error:", error);
      setRenderResponse(false);
      setLoader(false);
      setRenderError(true);
    }
  };

  return (
    <div>
      <h2 className="heading">ADD CREDIT CARD</h2>
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <form onSubmit={handleSubmit2}>
          <Stack
            spacing={3}
            direction="column"
            sx={{ width: 400, padding: "10px" }}
          >
            <div>
              <TextField
                type="number"
                label="Customer id"
                name="customerId"
                value={postData.customerId}
                onChange={handleInputChange}
                sx={{ width: "90%" }}
                required
              />
            </div>
            <div>
              <Button
                variant="contained"
                size="large"
                type="submit"
                class="btn btn-outline-primary"
              >
                SEARCH
              </Button>
            </div>
          </Stack>
        </form>
      </Box>
      {customerFound === 1 ? (
        <Box mt={4} display="flex" justifyContent="center" alignItems="center">
          <Stack
            spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 400 }}
          >
          {/* //Sai sandhya code */}
            {/* <div>Customer found with id {customerDetails.customerId}</div>
            <div>
              Name: {customerDetails.firstName} {customerDetails.lastName}
            </div> */}
            
            <div><CustomerDetailsDisplay customer={customerDetails}></CustomerDetailsDisplay></div>
            <div>Click the add button to add a new credit card.</div>
            
            
            <form onSubmit={handleSubmit}>
            <Stack
            spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 400 }}
          >
            <div>
              <TextField
                type="text"
                label="Credit Card Type"
                name="description"
                value={postData.description}
                onChange={handleInputChange}
                sx={{ width: "90%" }}
                required
              />
            </div>
              <div>

                <Button
                  variant="contained"
                  size="large"
                  class="btn btn-outline-primary"
                  type="submit"
                >
                  ADD
                </Button>
              </div>
              </Stack>
            </form>
            
          </Stack>
        </Box>
      ) : customerFound === 2 ? (
        <div>Customer not found!</div>
      ) : (
        <div></div>
      )}
      {loader && (
        <div>
          {" "}
          <CircularProgress />
        </div>
      )}
      {renderResponse && (
        <Box mt={4} display="flex" justifyContent="center" alignItems="center">
          <Stack
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 400 }}
          >
          <div>
              <h3>Credit card added successfully.</h3>{" "}
            </div>
          <div><TableNewCreditCard customer={renderData}></TableNewCreditCard></div>
            {/* //sai sandhya code */}
            {/* <div>
              <b>Customer id:</b> {renderData.customerId}
            </div>
            <div>
              <b>Credit card number:</b> {renderData.cardNumber}{" "}
            </div>
            <div>
              <b>Status:</b> <span>{renderData.status}</span>{" "}
            </div> */}
          </Stack>
        </Box>
      )}
      {renderError && (
        <Box mt={4} display="flex" justifyContent="center" alignItems="center">
          <Stack
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 400 }}
          >
            <div>
              <h4>Please enter valid customer details.</h4>
            </div>
          </Stack>
        </Box>
      )}
    </div>

  );
}

export default AddCreditCard;
