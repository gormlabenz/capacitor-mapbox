//
//  EchoPlugin.swift
//  App
//
//  Created by Gorm Labenz on 25.04.22.
//

import Capacitor
import Foundation
import Combine
import CoreLocation

@available(iOS 13.0, *)
@objc(CompassHeading)
public class CompassHeading: CAPPlugin, CLLocationManagerDelegate {
    var degrees: Double = .zero
    let locationManager = CLLocationManager()
    
    override public func load() {
        self.setup()
    }
    
    private func setup() {
        self.locationManager.requestWhenInUseAuthorization()
        self.locationManager.delegate = self
        if CLLocationManager.headingAvailable() {
            self.locationManager.startUpdatingLocation()
            self.locationManager.startUpdatingHeading()
        }
    }
    
    public func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
        self.degrees = -1 * newHeading.magneticHeading
        self.notifyListeners(
            "degree",
            data: ["degree": self.degrees]
        )
    }
}
