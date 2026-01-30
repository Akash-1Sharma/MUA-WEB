import requests
import sys
import json
from datetime import datetime

class PalakSinghAPITester:
    def __init__(self, base_url="https://luxury-artistry.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error Response: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"Error Response: {response.text}")
                self.failed_tests.append({
                    "test": name,
                    "endpoint": endpoint,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "error": response.text[:200]
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "endpoint": endpoint,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )

    def test_create_booking(self):
        """Test booking creation"""
        booking_data = {
            "name": "Test Client",
            "phone": "+91 9876543210",
            "email": "test@example.com",
            "event_type": "Bridal Makeup",
            "event_date": "2025-02-15",
            "city": "Mumbai",
            "message": "Test booking for bridal makeup"
        }
        
        success, response = self.run_test(
            "Create Booking",
            "POST",
            "api/bookings",
            200,
            data=booking_data
        )
        
        if success and 'id' in response:
            return response['id']
        return None

    def test_get_bookings(self):
        """Test getting all bookings"""
        return self.run_test(
            "Get All Bookings",
            "GET",
            "api/bookings",
            200
        )

    def test_create_testimonial(self):
        """Test testimonial creation"""
        testimonial_data = {
            "client_name": "Test Reviewer",
            "rating": 5,
            "review": "Amazing makeup artist! Highly recommend for bridal makeup.",
            "event_type": "Bridal"
        }
        
        success, response = self.run_test(
            "Create Testimonial",
            "POST",
            "api/testimonials",
            200,
            data=testimonial_data
        )
        
        if success and 'id' in response:
            return response['id']
        return None

    def test_get_testimonials(self):
        """Test getting all testimonials"""
        return self.run_test(
            "Get All Testimonials",
            "GET",
            "api/testimonials",
            200
        )

    def test_get_approved_testimonials(self):
        """Test getting approved testimonials"""
        return self.run_test(
            "Get Approved Testimonials",
            "GET",
            "api/testimonials/approved",
            200
        )

def main():
    print("🧪 Starting PALAK SINGH API Tests...")
    print("=" * 50)
    
    # Setup
    tester = PalakSinghAPITester()

    # Run all tests
    print("\n📋 Testing API Endpoints...")
    
    # Test root endpoint
    tester.test_root_endpoint()
    
    # Test booking endpoints
    booking_id = tester.test_create_booking()
    tester.test_get_bookings()
    
    # Test testimonial endpoints
    testimonial_id = tester.test_create_testimonial()
    tester.test_get_testimonials()
    tester.test_get_approved_testimonials()

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for test in tester.failed_tests:
            print(f"  - {test['test']}: {test.get('error', 'Status code mismatch')}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())