import pandas as pd
import numpy as np
from scipy import stats

class Profile:
    def __init__(self, data):
        # *********
        data.drop(['Unnamed: 0.1', 'Unnamed: 0', 'CustomerID'], axis=1, inplace=True, errors='ignore')
        data.rename(inplace=True, columns={
            'App': 'App Ratings','ServiceOffline': 'Offline Service Rating', 'EaseOfAccessOfBankingServiceOnline': 'Ease Of Access Of Banking Service Online', 'PaymentDeclineServerIssue': 'Payment Decline Server Issue', 'FraudSecurity': "Bank's Strength of Fraud Security", 'Insurance': 'How good Insurance is', 'LoanApproval': 'Ease of Loan Approval', 'WithinTimeframeServiceDelivery': 'Within Time frame issue resolved', 'SincereEffortsSolvingProblems': 'Feel that bank has made Sincere Efforts in Solving Problems', 'HelpFinancialPlanning': 'Bank Helps in Financial Planning', 'RespondingCustomerRequests': 'Responding Customer Requests', 'FeelingSafetyTransacting': 'Feeling Safety while Transacting', 'PersonalAttention': 'Bank pays Personal Attention', 'AcceptingResolvingFaults': 'AcceptingResolvingFaults'})
        data.drop(['AcceptingResolvingFaults'], axis=1, inplace=True, errors='ignore')
        # *********
        self.data = data

    
    def generate_profile(self):
        '''Generate a profile of the Cluster/Customer'''

        age = self.age()
        age_prompt = f"Average age: {age[0]}. Range: {age[1][0]} to {age[1][1]}.\n"

        gender = self.gender()
        gender_prompt = f"Male to female ratio: {gender}\n"

        marital_status = self.marital_status()
        if marital_status == None:
            marital_status_prompt = "Marital status is equally distributed\n"
        else:
            marital_status_prompt = f"Most common marital status: {marital_status}\n"

        balance = self.balance()
        balance_prompt = f"Average balance: {balance[0]}. Median: {balance[1]}. Range: {balance[3]} to {balance[4]}.\n"

        tenure = self.tenure()
        tenure_prompt = f"Average tenure of Customer: {tenure[0]}. Minimum tenure: {tenure[1]}.\n"

        finance = self.finance()
        finance_prompt = f"Avg financial stability: {finance[0]}.\nAvg transactions per month: {finance[1]}.\nAvg salary: {finance[2][0]}.\nRange: {finance[2][1][0]} to {finance[2][1][1]}.\n"

        jobs = self.jobs()  # tbd
        jobs_prompt = f"Frequency of all jobs:\n{jobs}\n"[:-26]

        avg_dict = self.avg_dict()
        avg_dict_prompt = f"These are all proportion of customer engaging with (out of 10):\n{avg_dict}\n"[:-15]

        loan = self.loan()
        if loan[0][0] == 'Same':
            loan_prompt = f"Distribution of Loan Taken is similar\n"
        else:
            if loan[0][1][0] == 'no_loan':
                loan_prompt = f"{loan[0][1][1]} is highly used by customers\n"
            else:
                loan_prompt = f"{loan[0][1][0]} is highly used by customers\n"
        loan_prompt += f"Count of all loan type:\n{loan[1]}\n"[:-26]

        issue_not_resolved = self.issue_not_resolved()
        if issue_not_resolved[0] == None:
            issue_not_resolved_prompt = "All issues are equally resolved\n"
        else:
            issue_not_resolved_prompt = f"Most common issue not resolved: {issue_not_resolved[0]}"
        issue_not_resolved_prompt += f"Proportion of all unsolved issues:\n{issue_not_resolved[1]}\n"[:-15]

        credit_score_dist = self.get_credit_score_dist()
        credit_score_dist_prompt = f"Average credit score: {credit_score_dist[1]}. "
        if credit_score_dist[0] == None:
            credit_score_dist_prompt += "Credit score is equally distributed\n"
        else:
            credit_score_dist_prompt += f"Most common credit score bracket: {credit_score_dist[0].left} to {credit_score_dist[0].right}\n"
        
        feedback = self.feedback()
        feedback_prompt = f"Ratings of feedbacks (ratings are out of 10):\n{feedback}\n"[:-15]

        the_ultimate_prompt = age_prompt + '\n' + gender_prompt + '\n' + marital_status_prompt + '\n' + balance_prompt + '\n' + tenure_prompt + '\n' + jobs_prompt + '\n' + finance_prompt + '\n' + avg_dict_prompt + '\n' + loan_prompt + '\n' + issue_not_resolved_prompt + '\n' + credit_score_dist_prompt + '\n' + feedback_prompt
        
        return the_ultimate_prompt


    def age(self):
        '''mean and (q1, q2)'''
        return (self.data['Age'].mean(), np.percentile(self.data['Age'], [25, 75]))

    def gender(self):
        '''m to f ratio'''
        return (self.data['Gender'] == 'Male').sum() / (self.data['Gender'] == 'Female').sum()
    
    def marital_status(self):
        '''Status with max frequency (if any, else None)'''
        counts = self.data['MaritalStatus'].value_counts()
        _, p, _, expected = stats.chi2_contingency([counts])
        if p > 0.05:
            ms = None
        else:
            ms = counts.idxmax()
        return ms

    def balance(self):
        '''mean, med, std, q1, q2'''

        mean = self.data['Balance'].mean()
        med = self.data['Balance'].median()
        std = self.data['Balance'].std()
        q1 = self.data['Balance'].quantile(0.25)
        q2 = self.data['Balance'].quantile(0.75)
        return mean, med, std, q1, q2
    
    def tenure(self):
        tenure_dist = (self.data['Tenure'].mean(), self.data['Tenure'].min())
        return tenure_dist
    
    def finance(self):
        '''avg_financial stability, avg transactions pm, (salary mean, (q1, q2))'''

        avg_financial_stability = (self.data['Balance'] / self.data['EstimatedSalary']).mean()
        avg_trans_pm = self.data['AvgTransactionPerMonth'].mean()
        salary_dist = (self.data['EstimatedSalary'].mean(), (self.data['EstimatedSalary'].quantile(0.25), self.data['EstimatedSalary'].quantile(0.75)))

        return avg_financial_stability, avg_trans_pm, salary_dist
    
    def jobs(self):
        '''jobs frequency'''
        counts = self.data['Job'].value_counts()

        return counts

    def avg_dict(self):
        '''dictionary conataining averages'''

        d = {
            "Have credit cards" : (self.data['HasCrCard'] == 'Yes').sum() / len(self.data),
            "Use digital bank services" : (self.data['UseOfDigitalBankServices'] == 'Yes').sum() / len(self.data),
            "Have knowledge about services" : self.data['KnowledgeAboutServices'].mean(),
            "do investment" : (self.data['InvestmentInBankSchemes'] == 'Yes').sum() / len(self.data),
            "actively use bank" : (self.data['IsActiveMember'] == 'Yes').sum() / len(self.data),
            "average bank rating" : self.data['Rating'].mean(),
            "have issurance from bank" : (self.data['ServicesUsed'].map(lambda x: 1 if x in ['Issurance', 'Insurance, Savings Plans'] else 0)).sum() / len(self.data),
            "Use savings plan" : (self.data['ServicesUsed'].map(lambda x: 1 if x in ['Savings Plans', 'Insurance, Savings Plans'] else 0)).sum() / len(self.data),
            "have issue related to service" : (self.data['KeywordsInComplaint'].map(lambda x: 1 if x in ['Service, Fees', 'Service'] else 0)).sum() / len(self.data),
            "have issue related to fees" : (self.data['KeywordsInComplaint'].map(lambda x: 1 if x in ['Service, Fees', 'Fees'] else 0)).sum() / len(self.data),
            "have issue related to delay" : (self.data['KeywordsInComplaint'].map(lambda x: 1 if x in ['Technical Issue, Delay', 'Delay'] else 0)).sum() / len(self.data),
            "have issue related to technical" : (self.data['KeywordsInComplaint'].map(lambda x: 1 if x in ['Technical Issue, Delay', 'technical'] else 0)).sum() / len(self.data),
            "have issue related to miscommunication" : (self.data['KeywordsInComplaint'].map(lambda x: 1 if x in ['Miscommunication'] else 0)).sum() / len(self.data),
            "avg balance per tenure" : (self.data['Balance'] / self.data['Tenure']).sum()  # decide the name or description
        }

        return pd.Series(d)
    
    def feedback(self):
        '''ratings of feedbacks'''
        feedback_ratings = self.data.loc[:, 'App Ratings':].mean()
        
        return feedback_ratings
    
    def loan(self):
        '''(dist(Same or Diff), (loan type with significant frequency, second ranked loan(if significant))), count of all'''

        def get_loan_dist(d = self.data['TypeOfLoan'].value_counts()):
            counts = d
            expected = [sum(counts) / len(counts)] * len(counts)
            s, p = stats.chisquare(counts, expected)
            if p > 0.05:
                dist = 'Same'
                loan_type = None
                second = None
            else:
                dist = 'Diff'
                loan_type = counts.idxmax()
                second = None

                if loan_type == 'no_loan':
                    dist2, l = get_loan_dist(self.data['TypeOfLoan'].value_counts().drop('no_loan'))
                    if dist2 == 'Diff':
                        second = l[0]
            return (dist, (loan_type, second))
        
        return (get_loan_dist(), self.data['TypeOfLoan'].value_counts())
    
    def issue_not_resolved(self):
        '''issue with significant count, proportion of all unsolved issues'''

        ct = pd.crosstab(self.data['KeywordsInComplaint'], self.data['IssueResolved'])
        complaints_not_resolved_per_issue = ct['No'] / ct.sum(axis=1)
        
        counts = complaints_not_resolved_per_issue

        exp = [counts.sum() / len(counts)] * len(counts)
        s, p = stats.chisquare(counts, exp)
        if p > 0.05:
            issue = None
        else:
            issue = counts.idxmax()

        return issue, counts
    
    def get_credit_score_dist(self):
        '''credit bracket with significant count'''

        credit_score_bracs = pd.cut(self.data['CreditScore'], bins=[250, 410, 570, 730, 900])
        counts = credit_score_bracs.value_counts()

        exp = [sum(counts)/len(counts)] * len(counts)

        s, p = stats.chisquare(counts, exp)
        if p < 0.05:
            brac = counts.idxmax()
        else:
            brac = None

        return (brac, self.data['CreditScore'].mean())

