'use strict';

class DispatcherPanel extends React.Component {
    componentWillMount() {
        this.setState({
            listContent: 'dispatch-map'
        });
    }

    handleUpdateBody(body) {
        //console.log('Body Update Called', body);
        this.setState({
            listContent: body
        });
    }

    handleUpdateFilter(filter) {
        console.log('Filter Update Called', this.state.listContent);
        this.setState({
            listContent: 'dispatch-map'
        });
    }

    handleRequestShow(trip) {
        // console.log('Show Request', trip);
        if(trip.current_provider_id == 0) {
            this.setState({
                listContent: 'dispatch-assign',
                trip: trip
            });
        } else {
            this.setState({
                listContent: 'dispatch-map',
                trip: trip
            });
        }
        ongoingInitialize(trip);
    }

    handleRequestCancel(argument) {
        this.setState({
            listContent: 'dispatch-map'
        });
    }

    render() {

        let listContent = null;

        // console.log('DispatcherPanel', this.state.listContent);

        switch(this.state.listContent) {
            case 'dispatch-create':
                listContent = <div className="col-md-4">
                        <DispatcherRequest completed={this.handleRequestShow.bind(this)} cancel={this.handleRequestCancel.bind(this)} />
                    </div>;
                break;
            case 'dispatch-map':
                listContent = <div className="col-md-4">
                        <DispatcherList clicked={this.handleRequestShow.bind(this)} />
                    </div>;
                break;
            case 'dispatch-assign':
                listContent = <div className="col-md-4">
                        <DispatcherAssignList trip={this.state.trip} />
                    </div>;
                break;
        }

        return (
            <div className="container-fluid">
                <h4>Dispatcher</h4>

                <DispatcherNavbar body={this.state.listContent} updateBody={this.handleUpdateBody.bind(this)} updateFilter={this.handleUpdateFilter.bind(this)}/>

                <div className="row">
                    { listContent }

                    <div className="col-md-8">
                        <DispatcherMap body={this.state.listContent} />
                    </div>
                </div>
            </div>
        );

    }
};

class DispatcherNavbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body: 'dispatch-map'
        };
    }

    filter(data) {
        console.log('Navbar Filter', data);
        this.props.updateFilter(data);
    }

    handleBodyChange() {
        ///// console.log('handleBodyChange', this.state);
        if(this.props.body != this.state.body) {
            this.setState({
                body: this.props.body
            });
        }

        if(this.state.body == 'dispatch-map') {
            this.props.updateBody('dispatch-create');
            this.setState({
                body: 'dispatch-create'
            });
        } else {
            this.props.updateBody('dispatch-map');
            this.setState({
                body: 'dispatch-map'
            });
        }
    }

    render() {

      if(dispatch_init == 'dispatch-map'){
      
           this.props.updateBody('dispatch-create');
      } else{
            this.props.updateBody('dispatch-map');
      }

        return (

            <nav className="navbar navbar-light bg-white b-a mb-2">
                <button className="navbar-toggler hidden-md-up"
                    data-toggle="collapse"
                    data-target="#process-filters"
                    aria-controls="process-filters"
                    aria-expanded="false"
                    aria-label="Toggle Navigation"></button>

                <form className="form-inline navbar-item ml-1 float-xs-right">
                    <div className="input-group">
                        <input type="text" className="form-control b-a" placeholder="Search for..." />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-primary b-a">
                                <i className="ti-search"></i>
                            </button>
                        </span>
                    </div>
                </form>

                <div className="collapse navbar-toggleable-sm" id="process-filters">
                    <ul className="nav navbar-nav dispatcher-nav">
                        <li className="nav-item active" onClick={this.filter.bind(this, 'all')}>
                            <span className="nav-link" href="#">All</span>
                        </li>
                        <li className="nav-item" onClick={this.filter.bind(this, 'waiting')}>
                            <span className="nav-link" href="#">My</span>
                        </li>
                        <li className="nav-item" onClick={this.filter.bind(this, 'warning')}>
                            <span className="nav-link" href="#">Warning</span>
                        </li>
                        <li className="nav-item" onClick={this.filter.bind(this, 'scheduled')}>
                            <span className="nav-link" href="#">Scheduled</span>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

class DispatcherList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                data: []
            }
        };
    }

    componentDidMount() {
        // Mount Global Map
        window.worldMapInitialize();

        // Refresh trip details
        window.Tranxit.TripTimer = setInterval(
            () => this.getTripsUpdate(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(window.Tranxit.TripTimer);
    }

    getTripsUpdate() {
        $.get('/admin/dispatcher/trips', function(result) {
            // console.log('Trips', result.hasOwnProperty('data'));
            if(result.hasOwnProperty('data')) {
                this.setState({
                    data: result
                });
            } else {
                // Might wanna show an empty list when this happens
                this.setState({
                    data: {
                        data: []
                    }
                });
            }
        }.bind(this));
    }

    handleClick(trip) {
        this.props.clicked(trip);
    }

    render() {
        // console.log(this.state.data);
        return (
            <div className="card">
                <div className="card-header text-uppercase"><b>List</b></div>

                <DispatcherListItem data={this.state.data.data} clicked={this.handleClick.bind(this)} />
            </div>
        );
    }
}

class DispatcherListItem extends React.Component {
    handleClick(trip) {
        this.props.clicked(trip)
    }
    render() {
        var listItem = function(trip) {
            return (
                    <div className="il-item" key={trip.id} onClick={this.handleClick.bind(this, trip)}>
                        <a className="text-black" href="#">
                            <div className="media">
                                <div className="media-body">
                                    <p className="mb-0-5">{trip.user.first_name} {trip.user.last_name}
                                    {trip.status == 'COMPLETED' ?
                                        <span className="tag tag-success pull-right"> {trip.status} </span>
                                    : trip.status == 'CANCELLED' ?
                                        <span className="tag tag-danger pull-right"> {trip.status} </span>
                                    : trip.status == 'PENDING' ?
                                        <span className="tag tag-warning pull-right"> {trip.status} </span>
                                    : trip.status == 'SCHEDULED' ?
                                        <span className="tag tag-primary pull-right"> {trip.status} </span>
                                    :
                                        <span className="tag tag-info pull-right"> {trip.status} </span>
                                    }
                                    </p>
                                    <h6 className="media-heading">From: {trip.s_address}</h6>
                                    <h6 className="media-heading">To: {trip.d_address ? trip.d_address : "Not Selected"}</h6>
                                    <h6 className="media-heading">Payment: {trip.payment_mode}</h6>
                                    <progress className="progress progress-success progress-sm" max="100"></progress>
                                    <span className="text-muted">{trip.current_provider_id == 0 ? "Manual Assignment" : "Auto Search"} : {trip.created_at}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                );
        }.bind(this);

        return (
            <div className="items-list">
                {this.props.data.map(listItem)}
            </div>
        );
    }
}

class DispatcherRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {

        /// Auto Assign Switch
        new Switchery(document.getElementById('provider_auto_assign'));

        // Schedule Time Datepicker
        $('#schedule_time').datetimepicker({
            minDate: window.Tranxit.minDate,
            maxDate: window.Tranxit.maxDate,
        });

        // Get Service Type List
        $.get('/admin/service', function(result) {
            this.setState({
                data: result
            });
        }.bind(this));


		        // Get ProviderList List
        $.get('/admin/dispatcher/providerList',{
            latitude:$("s_latitude").val(),
            longitude:$("s_longitude").val()
        }, function(result) {
            this.setState({
                 data: result
            });
        }.bind(this));

        // Mount Ride Create Map

        window.createRideInitialize();

        function stopRKey(evt) {
            var evt = (evt) ? evt : ((event) ? event : null);
            var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
            if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
        }

        document.onkeypress = stopRKey;
    }

    createRide(event) {
        console.log(event);
        event.preventDefault();
        event.stopPropagation();
        console.log('Hello', $("#form-create-ride").serialize());
        $.ajax({
            url: bases_url+'/admin/dispatcher',
            dataType: 'json',
            headers: {'X-CSRF-TOKEN': window.Laravel.csrfToken },
            type: 'POST',
            data: $("#form-create-ride").serialize(),
            success: function(data) {
                
                console.log('Accept', data);
                this.props.completed(data);
            }.bind(this)
        });
    }

    cancelCreate() {
        this.props.cancel(true);
    }

    render() {
        return (
            <div className="card card-block" id="create-ride">
                <h3 className="card-title text-uppercase">Ride Details</h3>
                <form id="form-create-ride" onSubmit={this.createRide.bind(this)} method="POST">
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text" className="form-control" name="first_name" id="first_name" placeholder="First Name" required />
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text" className="form-control" name="last_name" id="last_name" placeholder="Last Name" required />
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name="email" id="email" placeholder="Email" required/>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="form-group">
                                <label htmlFor="mobile">Phone</label>
                                <input type="text" className="form-control" name="mobile" id="mobile" placeholder="Phone" required />
                            </div>
                        </div>
                        <div className="col-xs-12">
                            <div className="form-group">
                                <label htmlFor="s_address">Pickup Address</label>

                                <input type="text"
                                    name="s_address"
                                    className="form-control"
                                    id="s_address"
                                    placeholder="Pickup Address"
                                    required></input>

                                <input type="hidden" name="s_latitude" id="s_latitude"></input>
                                <input type="hidden" name="s_longitude" id="s_longitude"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="d_address">Dropoff Address</label>

                                <input type="text"
                                    name="d_address"
                                    className="form-control"
                                    id="d_address"
                                    placeholder="Dropoff Address"
                                    required>
                                    )}