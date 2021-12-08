using System.Threading.Tasks;

namespace Back_Estoque.Utils.Interfaces
{
    public interface IViewRenderService
    {
        Task<string> RenderToStringAsync(string viewName, object model);
    }
}