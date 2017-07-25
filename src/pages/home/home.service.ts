import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MatchService{
    private url = 'http://121.240.130.104/mobile_apps/badminton/schedule.json';
    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache, no-store'});
    constructor(private http: Http) {}

    matchDetailsResponse: any = {};

    getMatchDetails () : Observable<any> {
        let url = 'http://121.240.130.104/mobile_apps/badminton/schedule.json' ;
        // let url = 'http://10.129.146.38/mobile_apps/badminton/schedule.json' ;
        let options = new RequestOptions({ headers: this.headers });
        return this.http.get(url, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }


    private extractData(res: Response) {
        this.matchDetailsResponse = res.json();
        return this.matchDetailsResponse || { };
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

     matchDateDetails = [
                            {
                                "date":"14/07/17",
                                "dateStr":"14th July",
                                "matchType":"League",
                                "mencount":0,
                                "womencount": 0,
                                "mixedcount": 0,
                                "matches": [
                                            {
                                                "Group":"Group A",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group B",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group C",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group D",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group E",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group F",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group G",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group H",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            }

                                        ]
                            }, 
                            {
                                "date":"17/07/17",
                                "dateStr":"17th July",
                                "matchType":"League",
                                "mencount":0,
                                "womencount": 0,
                                "mixedcount": 0,
                                "matches": [
                                            {
                                                "Group":"Group A",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group B",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group C",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group D",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group E",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group F",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group G",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            },
                                            {
                                                "Group":"Group H",
                                                "groupMatches": 
                                                {
                                                    "categories" :[
                                                        {
                                                            "category" : "Mens",
                                                            "matches": []
                                                        },
                                                        
                                                        {
                                                            "category" : "Womens",
                                                            "matches": []

                                                        },
                                                        
                                                        {
                                                            
                                                            "category" : "Mixed",
                                                            "matches": []
                                                        }
                                                    ]
                                                    
                                                },
                                            }

                                        ]
                            } 
            ]
}
