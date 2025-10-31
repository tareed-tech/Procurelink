export default function Partners() {
  const partners = [
    'Dell Technologies',
    'HP Inc.',
    'Lenovo',
    'Apple',
    'Microsoft',
    'ASUS',
  ];

  return (
    <section className="py-16 px-6 bg-soft-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-poppins font-semibold text-dark-gray mb-4">
            Trusted by Leading Brands
          </h2>
          <p className="text-gray-600 font-inter">
            Partnering with the world's top technology companies
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span className="text-gray-400 font-poppins font-medium text-sm group-hover:text-dark-gray transition-colors">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
