using Umbraco.Engage.Headless.Extensions;
using Umbraco.Engage.Infrastructure.Permissions.ModulePermissions;
using Umbraco.Engage.Infrastructure.Personalization.Segments.Rules;
using Umbraco.Engage.Web.Cockpit.Segments;
using Workshop.Website.Engage;
using Workshop.Website.Engage.Rules;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddCors(options => options.AddPolicy("AllowAnyOrigin", policy => policy.AllowAnyOrigin()))
    .AddUnique<IModulePermissions, CookieModulePermission>();

builder.Services.AddTransient<ISegmentRuleFactory, DayOfWeekSegmentRuleFactory>();
builder.Services.AddTransient<ICockpitSegmentRuleFactory, DayOfWeekCockpitSegmentRuleFactory>();

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddDeliveryApi()
    .AddEngageApiDocumentation()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();


app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.AppBuilder.UseCors("AllowAnyOrigin");
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseInstallerEndpoints();
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

await app.RunAsync();
