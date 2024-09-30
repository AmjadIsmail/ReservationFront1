import { Input } from "reactstrap";

const StickySidebarFa = () => {
  return (
    <div class="sticky-cls-top">
      <div class="review-section">
        <div class="review_box">
          <div class="title-top">
            <h5>travel addons</h5>
          </div>
          <div class="flight_detail">
            <div class="summery_box">
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <td>flight fare</td>
                    <td>$2500</td>
                  </tr>
                  <tr class="title">
                    <td>additional baggage</td>
                  </tr>
                  <tr>
                    <td>additional 15kg</td>
                    <td>+ $25</td>
                  </tr>
                  <tr class="title">
                    <td>inflight meals</td>
                  </tr>
                  <tr>
                    <td>veg meal X (1)</td>
                    <td>+ $18</td>
                  </tr>
                  <tr>
                    <td>non-veg meal X (1)</td>
                    <td>+ $18</td>
                  </tr>
                  <tr class="title">
                    <td>seats</td>
                  </tr>
                  <tr>
                    <td>seat(10D)</td>
                    <td>+ $5</td>
                  </tr>
                </tbody>
              </table>
              <div class="grand_total">
                <h5>
                  grand total: <span>$2750</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="single-section">
        <div class="single-sidebar p-0">
          <div class="newsletter-sec">
            <div>
              <h4 class="title">always first</h4>
              <p>
                Be the first to find out latest tours and exclusive offers and
                get 15% off your first booking.
              </p>
              <form>
                <Input
                  type="email"
                  id="email1"
                  class="form-control"
                  placeholder="Enter your email"
                />
                <div class="button">
                  <a href="#" class="btn btn-solid ">
                    be the first
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickySidebarFa;
