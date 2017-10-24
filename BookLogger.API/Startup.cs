using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;

//[assembly: OwinStartup(typeof(BookLogger.API.Startup))]

namespace BookLogger.API
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
