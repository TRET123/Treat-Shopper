import React, {Component} from 'react'

class ConfirmationPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="row p-5">
                  <div className="col-md-6">
                    <img src="http://via.placeholder.com/400x90?text=logo" />
                  </div>
                </div>

                <hr className="my-5" />

                <div className="row pb-5 p-5">
                  <div className="col-md-6">
                    <p className="font-weight-bold mb-4">Payment Details</p>
                    <p className="mb-1">
                      <span className="text-muted">Name: </span> John Doe
                    </p>
                    <p className="mb-1">
                      <span className="text-muted">Payment Type: </span> Credit
                      Card
                    </p>
                  </div>
                </div>

                <div className="row p-5">
                  <div className="col-md-12">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            ID
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Item
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Description
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Quantity
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Unit Cost
                          </th>
                          <th className="border-0 text-uppercase small font-weight-bold">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Software</td>
                          <td>LTS Versions</td>
                          <td>21</td>
                          <td>$321</td>
                          <td>$3452</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Software</td>
                          <td>Support</td>
                          <td>234</td>
                          <td>$6356</td>
                          <td>$23423</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Software</td>
                          <td>Sofware Collection</td>
                          <td>4534</td>
                          <td>$354</td>
                          <td>$23434</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="d-flex flex-row-reverse bg-dark text-white p-4">
                  <div className="py-3 px-5 text-right">
                    <div className="mb-2">Grand Total</div>
                    <div className="h2 font-weight-light">$234,234</div>
                  </div>

                  <div className="py-3 px-5 text-right">
                    <div className="mb-2">Discount</div>
                    <div className="h2 font-weight-light">10%</div>
                  </div>

                  <div className="py-3 px-5 text-right">
                    <div className="mb-2">Sub - Total amount</div>
                    <div className="h2 font-weight-light">$32,432</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-light mt-5 mb-5 text-center small">
          <a
            className="text-light"
            target="_blank"
            href="https://treat-shopper.herokuapp.com/"
          >
            treat-shopper.herokuapp.com
          </a>
        </div>
      </div>
    )
  }
}

export default ConfirmationPage
