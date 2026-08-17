import React from 'react'
import "./employee-detail-information.css"

const formatLabel = (value) => {
    return value
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};


const InfoItem = ({ label, value }) => {
    return (
        <div className="employee-info-item">

            <span className="employee-info-label">
                {label}
            </span>

            <span className="employee-info-value">
                {value ?? "-"}
            </span>

        </div>
    );
};


const InfoGroup = ({ title, children }) => {
    return (
        <section className="employee-info-group">

            <div className="employee-info-group-header">
                <h3>{title}</h3>
            </div>

            <div className="employee-info-grid">
                {children}
            </div>

        </section>
    );
};


export const EmployeeInformation = ({
    employee,
}) => {

    if (!employee) {
        return null;
    }


    return (
        <section className="employee-information">

            <div className="employee-information-heading">

                <div>
                    <h2>Employee Information</h2>

                    <p>
                        Detailed information about the employee.
                    </p>
                </div>

            </div>


            <div className="employee-information-groups">

                <InfoGroup title="Personal Information">

                    <InfoItem
                        label="Employee Number"
                        value={employee.employee_number}
                    />

                    <InfoItem
                        label="Age"
                        value={employee.age}
                    />

                    <InfoItem
                        label="Gender"
                        value={employee.gender}
                    />

                    <InfoItem
                        label="Marital Status"
                        value={employee.marital_status}
                    />

                    <InfoItem
                        label="Education"
                        value={employee.education}
                    />

                    <InfoItem
                        label="Education Field"
                        value={employee.education_field}
                    />

                    <InfoItem
                        label="Business Travel"
                        value={employee.business_travel}
                    />

                    <InfoItem
                        label="Distance From Home"
                        value={employee.distance_from_home}
                    />

                </InfoGroup>


                <InfoGroup title="Job Information">

                    <InfoItem
                        label="Department"
                        value={employee.department}
                    />

                    <InfoItem
                        label="Job Role"
                        value={employee.job_role}
                    />

                    <InfoItem
                        label="Job Level"
                        value={employee.job_level}
                    />

                    <InfoItem
                        label="Job Involvement"
                        value={employee.job_involvement}
                    />

                    <InfoItem
                        label="Total Working Years"
                        value={employee.total_working_years}
                    />

                    <InfoItem
                        label="Years At Company"
                        value={employee.years_at_company}
                    />

                    <InfoItem
                        label="Years In Current Role"
                        value={employee.years_in_current_role}
                    />

                    <InfoItem
                        label="Years With Current Manager"
                        value={employee.years_with_curr_manager}
                    />

                    <InfoItem
                        label="Years Since Last Promotion"
                        value={employee.years_since_last_promotion}
                    />

                    <InfoItem
                        label="Companies Worked"
                        value={employee.num_companies_worked}
                    />

                </InfoGroup>


                <InfoGroup title="Compensation & Work">

                    <InfoItem
                        label="Monthly Income"
                        value={employee.monthly_income}
                    />

                    <InfoItem
                        label="Monthly Rate"
                        value={employee.monthly_rate}
                    />

                    <InfoItem
                        label="Hourly Rate"
                        value={employee.hourly_rate}
                    />

                    <InfoItem
                        label="Daily Rate"
                        value={employee.daily_rate}
                    />

                    <InfoItem
                        label="Percent Salary Hike"
                        value={`${employee.percent_salary_hike}%`}
                    />

                    <InfoItem
                        label="Stock Option Level"
                        value={employee.stock_option_level}
                    />

                    <InfoItem
                        label="Overtime"
                        value={employee.over_time}
                    />

                    <InfoItem
                        label="Training Last Year"
                        value={employee.training_times_last_year}
                    />

                </InfoGroup>


                <InfoGroup title="Satisfaction & Development">

                    <InfoItem
                        label="Environment Satisfaction"
                        value={employee.environment_satisfaction}
                    />

                    <InfoItem
                        label="Job Satisfaction"
                        value={employee.job_satisfaction}
                    />

                    <InfoItem
                        label="Relationship Satisfaction"
                        value={employee.relationship_satisfaction}
                    />

                    <InfoItem
                        label="Work Life Balance"
                        value={employee.work_life_balance}
                    />

                    <InfoItem
                        label="Performance Rating"
                        value={employee.performance_rating}
                    />

                </InfoGroup>

            </div>

        </section>
    );
};