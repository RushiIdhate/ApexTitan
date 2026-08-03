import React from 'react'

function Dashboard() {
    return (
        <>
            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                <div>
                    <div className="page-title">Overview</div>
                    <div className="page-sub">Wednesday, 18 July — here's how things are trending.</div>
                </div>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-range btn-sm">24H</button>
                    <button type="button" className="btn btn-range btn-sm active">7D</button>
                    <button type="button" className="btn btn-range btn-sm">30D</button>
                    <button type="button" className="btn btn-range btn-sm">90D</button>
                </div>
            </div>

            <div className="row g-3 mb-3">
                <div className="col-6 col-lg-3">
                    <div className="stat-card">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="stat-label">Revenue</span>
                            <div className="stat-icon bg-blue"><i className="bi bi-currency-dollar"></i></div>
                        </div>
                        <div className="stat-value">$84,210</div>
                        <div className="delta up mt-2"><i className="bi bi-arrow-up-short"></i>12.4% vs last week</div>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="stat-card">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="stat-label">Active users</span>
                            <div className="stat-icon bg-green"><i className="bi bi-people"></i></div>
                        </div>
                        <div className="stat-value">6,342</div>
                        <div className="delta up mt-2"><i className="bi bi-arrow-up-short"></i>4.1% vs last week</div>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="stat-card">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="stat-label">Orders</span>
                            <div className="stat-icon bg-amber"><i className="bi bi-box-seam"></i></div>
                        </div>
                        <div className="stat-value">1,208</div>
                        <div className="delta up mt-2"><i className="bi bi-arrow-up-short"></i>2.8% vs last week</div>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="stat-card">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="stat-label">Churn rate</span>
                            <div className="stat-icon bg-red"><i className="bi bi-graph-down-arrow"></i></div>
                        </div>
                        <div className="stat-value">2.3%</div>
                        <div className="delta down mt-2"><i className="bi bi-arrow-down-short"></i>0.6% vs last week</div>
                    </div>
                </div>
            </div>

            <div className="row g-3 mb-3">
                <div className="col-lg-7">
                    <div className="panel">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <div className="panel-title">Traffic by channel</div>
                                <div className="panel-sub">Sessions, last 7 days</div>
                            </div>
                            <div className="d-flex gap-3">
                                <div className="d-flex align-items-center gap-1">
                                    <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--accent)", display: "inline-block" }}></span>
                                    <span className="small text-muted">Direct</span>
                                </div> 
                                <div className="d-flex align-items-center gap-1">
                                    <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#D7DEFF", display: "inline-block" }}></span>
                                    <span className="small text-muted">Referral</span>
                                </div>
                            </div>
                        </div>
                        <div className="bars">
                            <div className="bar-col">
                                <div className="bar-stack" style={{ height : "62%" }}>
                                    <div className="seg-a" style={{ height : "65%" }}></div>
                                    <div className="seg-b" style={{ height : "35%" }}></div>
                                </div><span className="lbl">Mon</span>
                            </div>
                            <div className="bar-col">
                                <div className="bar-stack" style={{ height : "78%" }}>
                                    <div className="seg-a" style={{ height : "70%" }}></div>
                                    <div className="seg-b" style={{ height : "30%" }}></div>
                                </div><span className="lbl">Tue</span>
                            </div>
                            <div className="bar-col">
                                <div className="bar-stack" style={{ height : "55%" }}>
                                    <div className="seg-a" style={{ height : "60%" }}></div>
                                    <div className="seg-b" style={{ height : "40%" }}></div>
                                </div><span className="lbl">Wed</span>
                            </div>
                            <div className="bar-col">
                                <div className="bar-stack" style={{ height : "90%" }}>
                                    <div className="seg-a" style={{ height : "75%" }}></div>
                                    <div className="seg-b" style={{ height : "25%" }}></div>
                                </div><span className="lbl">Thu</span>
                            </div>
                            <div className="bar-col">
                                <div className="bar-stack" style={{ height : "70%" }}>
                                    <div className="seg-a" style={{ height : "55%" }}></div>
                                    <div className="seg-b" style={{ height : "45%" }}></div>
                                </div><span className="lbl">Fri</span>
                            </div>
                            <div className="bar-col">
                                <div className="bar-stack" style={{ height : "40%" }}>
                                    <div className="seg-a" style={{ height : "50%" }}></div>
                                    <div className="seg-b" style={{ height : "50%" }}></div>
                                </div><span className="lbl">Sat</span>
                            </div>
                            <div className="bar-col">
                                <div className="bar-stack" style={{ height : "35%" }}>
                                    <div className="seg-a" style={{ height : "45%" }}></div>
                                    <div className="seg-b" style={{ height : "55%" }}></div>
                                </div><span className="lbl">Sun</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="panel">
                        <div className="panel-title mb-1">Recent activity</div>
                        <div className="panel-sub mb-3">Live feed</div>

                        <div className="feed-item">
                            <span className="feed-dot" style={{ background : "var(--accent)" }}></span>
                            <div>
                                <div className="feed-text"><b>Order #8843</b> was fulfilled and shipped</div>
                                <div className="feed-time">2 min ago</div>
                            </div>
                        </div>
                        <div className="feed-item">
                            <span className="feed-dot" style={{ background : "#DD9A00" }}></span>
                            <div>
                                <div className="feed-text"><b>Payment retry</b> scheduled for invoice #2291</div>
                                <div className="feed-time">18 min ago</div>
                            </div>
                        </div>
                        <div className="feed-item">
                            <span className="feed-dot" style={{ background : "var(--accent)" }}></span>
                            <div>
                                <div className="feed-text"><b>Priya Nair</b> upgraded to the Team plan</div>
                                <div className="feed-time">41 min ago</div>
                            </div>
                        </div>
                        <div className="feed-item">
                            <span className="feed-dot" style={{ background : "#E14338" }}></span>
                            <div>
                                <div className="feed-text"><b>Webhook delivery</b> failed for endpoint /orders</div>
                                <div className="feed-time">1 hr ago</div>
                            </div>
                        </div>
                        <div className="feed-item">
                            <span className="feed-dot" style={{ background : "var(--accent)" }}></span>
                            <div>
                                <div className="feed-text"><b>Weekly report</b> generated and sent to admins</div>
                                <div className="feed-time">3 hr ago</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="panel p-0">
                <div className="d-flex justify-content-between align-items-center p-4 pb-0 mb-0">
                    <div>
                        <div className="panel-title">Recent orders</div>
                        <div className="panel-sub">Last updated 4 minutes ago</div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table mb-0 align-middle">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-muted">#8843</td>
                                <td><span className="cust-avatar">RS</span>Rhea Sen</td>
                                <td>Jul 18, 2026</td>
                                <td className="fw-semibold">$214.00</td>
                                <td><span className="badge-status success">Fulfilled</span></td>
                            </tr>
                            <tr>
                                <td className="text-muted">#8842</td>
                                <td><span className="cust-avatar">JL</span>Jonas Lund</td>
                                <td>Jul 18, 2026</td>
                                <td className="fw-semibold">$89.50</td>
                                <td><span className="badge-status pending">Processing</span></td>
                            </tr>
                            <tr>
                                <td className="text-muted">#8841</td>
                                <td><span className="cust-avatar">PN</span>Priya Nair</td>
                                <td>Jul 17, 2026</td>
                                <td className="fw-semibold">$1,240.00</td>
                                <td><span className="badge-status success">Fulfilled</span></td>
                            </tr>
                            <tr>
                                <td className="text-muted">#8840</td>
                                <td><span className="cust-avatar">TA</span>Theo Adams</td>
                                <td>Jul 17, 2026</td>
                                <td className="fw-semibold">$56.20</td>
                                <td><span className="badge-status failed">Failed</span></td>
                            </tr>
                            <tr>
                                <td className="text-muted">#8839</td>
                                <td><span className="cust-avatar">MK</span>Maya Kessler</td>
                                <td>Jul 16, 2026</td>
                                <td className="fw-semibold">$402.75</td>
                                <td><span className="badge-status success">Fulfilled</span></td>
                            </tr>
                            <tr>
                                <td className="text-muted">#8838</td>
                                <td><span className="cust-avatar">OA</span>Omar Aziz</td>
                                <td>Jul 16, 2026</td>
                                <td className="fw-semibold">$128.00</td>
                                <td><span className="badge-status pending">Processing</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Dashboard