import Image from "next/image";
import logo from "@/public/images/logo.png";
import bookingSuccess from "@/public/images/booking-success.jpg";
import Link from "next/link";
import Meta from "@/components/common/Meta";

const Confirmation = () => {
  return (
    <>
      <Meta title="Confirmation" />
      <div style={{ margin: "80px 0" }}>
        <table
          className="template-width"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style={{
            backgroundColor: "#fff",
            boxShadow: "0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353)",
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "10px 20px" }}>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                >
                  <tbody>
                    <tr className="header">
                      <td align="left" valign="top">
                        <Link href="../index.html">
                          <Image
                            src={logo}
                            alt="..."
                            className="main-logo w100px h-auto"
                          />
                        </Link>
                      </td>
                      <td className="menu" align="right">
                        <ul>
                          <li
                            style={{
                              display: "inline-block",
                              textDecoration: "unset",
                            }}
                          >
                            <Link
                              href="../index.html"
                              style={{
                                textTransform: "capitalize",
                                color: "#444",
                                fontSize: "16px",
                                marginRight: "15px",
                                textDecoration: "none",
                              }}
                            >
                              Home
                            </Link>
                          </li>
                          <li
                            style={{
                              display: "inline-block",
                              textDecoration: "unset",
                            }}
                          >
                            <Link
                              href="../html/tour-layout.html"
                              style={{
                                textTransform: "capitalize",
                                color: "#444",
                                fontSize: "16px",
                                marginRight: "15px",
                                textDecoration: "none",
                              }}
                            >
                              Tours
                            </Link>
                          </li>
                          <li
                            style={{
                              display: "inline-block",
                              textDecoration: "unset",
                            }}
                          >
                            <Link
                              href="../html/hotel-layout.html"
                              style={{
                                textTransform: "capitalize",
                                color: "#444",
                                fontSize: "16px",
                                marginRight: "15px",
                                textDecoration: "none",
                              }}
                            >
                              hotels
                            </Link>
                          </li>
                          <li
                            style={{
                              display: "inline-block",
                              textDecoration: "unset",
                            }}
                          >
                            <Link
                              href="../html/contact-1.html"
                              style={{
                                textTransform: "capitalize",
                                color: "#444",
                                fontSize: "16px",
                                marginRight: "15px",
                                textDecoration: "none",
                              }}
                            >
                              Contact
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td className="success-img" style={{ textAlign: "center" }}>
                <Image src={bookingSuccess} alt="..." />
                <h2
                  style={{
                    margin: "0 auto",
                    width: "90%",
                    fontSize:
                      "calc(18px + (22 - 18) * ((100vw - 320px) / (1920 - 320)))",
                  }}
                >
                  Payment Successful ! Get Ready For Unforgettable Trip.
                </h2>
                <h3
                  style={{
                    width: "70%",
                    margin: "5px auto 28px",
                    lineHeight: "1.4",
                    color: "#9a9a9a",
                    fontWeight: "400",
                  }}
                >
                  Head to your Itinerary to check into your flight, make
                  updates, and share your plans with friends &amp; family.
                </h3>
                <Link href="#" className="btn">
                  view itinerary
                </Link>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0 20px" }}>
                <table className="booking-table">
                  <tbody>
                    <tr>
                      <td
                        className="booking-td"
                        style={{
                          borderRight: "1px solid #dddddd",
                          width: "50%",
                        }}
                      >
                        <h5
                          style={{
                            margin: "0 0 6px 0",
                            fontSize: "18px",
                            borderBottom: "1px solid #dddddd",
                            padding: "10px",
                          }}
                        >
                          Booking Details
                        </h5>
                        <table
                          style={{
                            paddingLeft: "10px",
                            color: "#616161",
                            paddingBottom: "10px",
                            paddingTop: "5px",
                          }}
                        >
                          <tbody
                            style={{ fontSize: "16px", lineHeight: "1.5" }}
                          >
                            <tr>
                              <td>Booking No:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                                54115
                              </td>
                            </tr>
                            <tr>
                              <td>Booking Status:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                                Confirmed
                              </td>
                            </tr>
                            <tr>
                              <td>Group/Person:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                                2 Adults, 1 Delux Room
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td className="booking-td" style={{ width: "50%" }}>
                        <h5
                          style={{
                            margin: "0 0 6px 0",
                            fontSize: "18px",
                            borderBottom: "1px solid #dddddd",
                            padding: "10px",
                          }}
                        >
                          Tour Details
                        </h5>
                        <table
                          style={{
                            paddingLeft: "10px",
                            color: "#616161",
                            paddingBottom: "10px",
                            paddingTop: "5px",
                          }}
                        >
                          <tbody
                            style={{ fontSize: "16px", lineHeight: "1.5" }}
                          >
                            <tr>
                              <td>Tour Details:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                                Splendid Spain
                              </td>
                            </tr>
                            <tr>
                              <td>Travel Date:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                                9-15 Nov 2019
                              </td>
                            </tr>
                            <tr>
                              <td>Total Days:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                                6 Days/ 7 Nights
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <h5
                  style={{
                    fontSize: "18px",
                    paddingLeft: "24px",
                    marginBottom: "10px",
                    marginTop: "30px",
                  }}
                >
                  Your Details
                </h5>
              </td>
            </tr>
            <tr style={{ color: "#616161" }}>
              <td style={{ padding: "0 24px 50px" }}>
                <h6
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "28px",
                    color: "#3c3c3c",
                  }}
                >
                  Name:
                  <span style={{ fontWeight: "500" }}>Mark Jecno</span>
                </h6>
                <h6
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "28px",
                    color: "#3c3c3c",
                  }}
                >
                  Address:{" "}
                  <span style={{ fontWeight: "500" }}>
                    1189 Half and Half Drive
                  </span>
                </h6>
                <h6
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "28px",
                  }}
                >
                  Fresno, California, 93721
                </h6>
                <h6
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "28px",
                  }}
                >
                  United Kingdom
                </h6>
                <h6
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "28px",
                    color: "#3c3c3c",
                  }}
                >
                  Email:
                  <Link href="#" style={{ fontWeight: "500" }}>
                    test@example.com
                  </Link>
                </h6>
                <h6
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "28px",
                    color: "#3c3c3c",
                  }}
                >
                  Phone No:{" "}
                  <span style={{ fontWeight: "500" }}>+444 222 111</span>
                </h6>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Confirmation;
