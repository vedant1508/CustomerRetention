from flask import Flask, render_template, request, redirect, jsonify
import pandas as pd
import joblib
import google.generativeai as genai
import markdown
from profile_builder import Profile
from prompt_llm import LLM
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])



def generate_recommendation(tier, customer_profile, cluster_profile):
    llm = LLM(customer_profile, cluster_profile, tier)
    recommendations = llm.suggest_retention_strategies()
    return recommendations

# Load the models
rf_model = joblib.load('rf_model.pkl')
kmeans_model = joblib.load('kmeans_model.pkl')
scaler_model = joblib.load('scaler_rf.pkl')
kscaler_model = joblib.load('knnscaler_model.pkl')

# Feature columns used in the XGBoost model
feature_cols = ['KeywordsInComplaint_Miscommunication', 'LoanApproval',
       'PaymentDeclineServerIssue', 'HasLoan', 'ServicesUsed_Insurance',
       'ReviewSentiment', 'Age', 'InvestmentInBankSchemes', 'Tenure',
       'CreditScore', 'Education', 'EstimatedSalary', 'MaritalStatus',
       'Balance', 'Rating', 'Job', 'AvgTransactionPerMonth', 'IssueResolved',
       'NumOfProducts', 'KnowledgeAboutServices']
feature_cols_idx = [39, 26, 23,  8, 34, 18,  0, 15,  6,  7,  3, 11,  4,  5, 17,  2,  9, 19, 12, 14]

# Mapping of clusters to segment names
cluster_names = {1: 'standard', 2: 'moderate', 0: 'special'}


# tools and tech
# ************************************************************************************************************************************


@app.route('/predict', methods=['GET', 'POST'])
def predict():
    # if request.method == 'POST':
    print('Request received')
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)

        # Read the CSV file into a DataFrame
    data = pd.read_csv(file)
    copy_data=data

        # one hot encoding
    copy_data = pd.get_dummies(copy_data, columns=['ServicesUsed','KeywordsInComplaint'], prefix=['ServicesUsed','KeywordsInComplaint'])
        
        # label encoding
    lb=LabelEncoder()
    for i in copy_data.columns:
        if copy_data[i].dtype=='object':
            copy_data[i]=lb.fit_transform(copy_data[i])

        # Get the customer ID from the form
    customer_id = int(request.form['customer_id'])
        
        # Filter the data for the selected customer
    customer_data = copy_data[copy_data['CustomerID'] == customer_id]
    customer_data.drop(['CustomerID', 'TypeOfLoan', 'CustomerLeft'], axis=1, inplace=True, errors='ignore')
        
    if customer_data.empty:
        return "Customer ID not found in the uploaded data."
        
    # Ensure the data has the required columns
    customer_data_scaled = scaler_model.transform(customer_data)
    customer_data_scaled = customer_data_scaled[0][feature_cols_idx]
    
    # Predict if the customer left or stayed
    left_prediction = rf_model.predict([customer_data_scaled])[0]  # 0 or 1

    # Predict the customer segment using KMeans
    kmeans_data = customer_data[['Balance', 'Tenure', 'AvgTransactionPerMonth', 'EstimatedSalary']]

    # scaling
    kmeans_scaled = kscaler_model.transform(kmeans_data)

    # segmentation
    cluster_label = kmeans_model.predict(kmeans_scaled)[0]
    customer_segment = cluster_names[cluster_label]

    # Determine if the customer stayed or left
    left_status = "Customer Retained" if left_prediction == 0 else "Customer Not Retained"

    # else:
    data_with_clusters = pd.read_csv('cluster_with_retention_data.csv')
    retained_data_with_cluster = data_with_clusters[(data_with_clusters['CustomerLeft'] == 0) & (data_with_clusters['Clusters'] == customer_segment)]
    retained_data_with_cluster.drop('Clusters', axis=1, inplace=True)

    # selected customer
    cust_data=data[data['CustomerID'] == customer_id]

    cust_data.rename(inplace=True, columns={
        'App': 'App Ratings','ServiceOffline': 'Offline Service Rating', 'EaseOfAccessOfBankingServiceOnline': 'Ease Of Access Of Banking Service Online', 'PaymentDeclineServerIssue': 'Payment Decline Server Issue', 'FraudSecurity': "Bank's Strength of Fraud Security", 'Insurance': 'How good Insurance is', 'LoanApproval': 'Ease of Loan Approval', 'WithinTimeframeServiceDelivery': 'Within Time frame issue resolved', 'SincereEffortsSolvingProblems': 'Feel that bank has made Sincere Efforts in Solving Problems', 'HelpFinancialPlanning': 'Bank Helps in Financial Planning', 'RespondingCustomerRequests': 'Responding Customer Requests', 'FeelingSafetyTransacting': 'Feeling Safety while Transacting', 'PersonalAttention': 'Bank pays Personal Attention', 'AcceptingResolvingFaults': 'AcceptingResolvingFaults'})
    cust_data.drop(['AcceptingResolvingFaults'], axis=1, inplace=True, errors='ignore')
    print('\n', cust_data, '\n\n')

    selected_customer_profile = cust_data.iloc[0].to_dict()  # Convert the customer profile to a dictionary

    p = Profile(retained_data_with_cluster)
    print(retained_data_with_cluster)
    cluster_profile = p.generate_profile()
        
    recommendation = f"Since, the customer is already in {customer_segment} tier, so we are not suggesting any startegies to retain them!"
    
        
    if left_status == 'Customer Retained':
        html = markdown.markdown(f"Since, the customer is already in {customer_segment} tier, so we are not suggesting any startegies to retain them!")
    else:
        recommendation = generate_recommendation(customer_segment, selected_customer_profile, cluster_profile)
        html=markdown.markdown(recommendation)

    return jsonify({
        "left_status": left_status,
        "customer_segment": customer_segment,
        "recommendation": recommendation,
        "customer_profile": selected_customer_profile
    })


    # return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0', port=3002)
