import google.generativeai as genai
import dotenv, os
import google.generativeai as genai
import dotenv, os
import json

dotenv.load_dotenv()
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

class LLM:
    def __init__(self, customer_profile, cluster_profile, tier):
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        self.customer_profile = customer_profile
        self.cluster_profile = cluster_profile
        self.tier = tier
        with open('context.json', 'r') as f:
            self.context = json.load(f)
        

    def suggest_retention_strategies(self):
        insurance = self.prompter('insurance', self.context['issurance_data'])
        wealth = self.prompter('wealth', self.context['wealth_data'])
        loan = self.prompter('loan', self.context['loans_data'])
        fixed_Deposits = self.prompter('fixed deposits', self.context['fixed_Deposits_data'])
        cards = self.prompter('cards', self.context['cards_data'])

        prompt = f'''
        The bank aims to improve customer retention by providing personalized services and products, enhancing customer support and engagement, and optimizing both digital and offline experiences.
        The bank offers various financial services, including savings accounts, credit cards, loans, and investment schemes.

        We have a customer whom we are unable to retain. Their profile is given below:\n{self.customer_profile}. They are most likely to fall under {self.tier} tier, if we successfully retained them. So, basically {self.tier} is their potential tier.
        The features of {self.tier} tier profile are given below:\n{self.cluster_profile}.
        Now, compare the customer's profile and features of their potential tier and based on that as well as the analysis of the customer profile, please select the best 3 policies for this customer,
        from below list of 15 policies categorized, which suits the customer well, considering their potential tier and aid us in retaining them and make sure that the customer's profile can be made more like a {self.tier} tier customer.
        Also, don't jsut stick with one kind of policies, have some relevant variety as well only if possible\n

        \n{insurance}
        \n{wealth}
        \n{loan}
        \n{fixed_Deposits}
        \n{cards}

        \nOutput should only include retention strategies and why there were chosen
        Format for output is given as:

        To retain the customer, we can suggest some Policies as given below:
        Policy 1
        Reason
        Policy 2
        Reason
        Policy 3
        Reason

        At last suggest some extra strategies, after thorough analysis of whatever data provided earlier, the bank can implement in their system such that more and more customer gets retained. Be specific to this customer and state why those strategies can help us retain them.
        '''

        return self.model.generate_content(prompt).text

    def prompter(self, domain, context):
        prompt = f'''
        We have a customer whom we are unable to retain. Their profile is given below:\n{self.customer_profile}. They are most likely to fall under {self.tier} tier, if retained, so basically {self.tier} is their potential tier.
        The features of {self.tier} tier profile are given below:\n{self.cluster_profile}.
        Now, compare the customer's profile and features of their potential tier and based on that as well as the analysis of the customer profile, please select 3 policies related to {domain} for this customer,
        from below list, such that we can retain them and make sure that the customer's profile can be made more like a {self.tier} tier customer:\n{context}
        Also, reason the selection.
        '''

        response = self.model.generate_content(prompt).text
        return response